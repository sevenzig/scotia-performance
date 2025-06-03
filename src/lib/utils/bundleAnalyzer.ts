/**
 * Bundle Analyzer Utility
 * Provides tools for analyzing and optimizing bundle size
 */

// Type definitions
export interface BundleStats {
  totalSize: number;
  gzippedSize: number;
  moduleCount: number;
  chunks: ChunkInfo[];
  largestModules: ModuleInfo[];
  duplicates: DuplicateInfo[];
  recommendations: Recommendation[];
}

export interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: string[];
  isEntry: boolean;
  isDynamic: boolean;
}

export interface ModuleInfo {
  name: string;
  size: number;
  gzippedSize: number;
  chunks: string[];
  isExternal: boolean;
}

export interface DuplicateInfo {
  module: string;
  occurrences: number;
  totalSize: number;
  chunks: string[];
}

export interface Recommendation {
  type: 'warning' | 'error' | 'info';
  category: 'bundle-size' | 'code-splitting' | 'tree-shaking' | 'duplicates';
  message: string;
  impact: 'high' | 'medium' | 'low';
  solution?: string;
}

// Constants for optimization thresholds
const THRESHOLDS = {
  CHUNK_SIZE_WARNING: 244 * 1024, // 244KB
  CHUNK_SIZE_ERROR: 500 * 1024,   // 500KB
  MODULE_SIZE_WARNING: 100 * 1024, // 100KB
  DUPLICATE_THRESHOLD: 2,          // 2 or more occurrences
  TOTAL_SIZE_WARNING: 1024 * 1024, // 1MB
  TOTAL_SIZE_ERROR: 2048 * 1024,   // 2MB
} as const;

/**
 * Analyze bundle composition and provide optimization recommendations
 * @param statsFile - Path to webpack/rollup stats file or stats object
 * @returns Promise<BundleStats>
 */
export async function analyzeBundleStats(statsFile: string | object): Promise<BundleStats> {
  let stats: any;
  
  // Load stats file or use provided object
  if (typeof statsFile === 'string') {
    if (typeof fetch !== 'undefined') {
      // Browser environment
      const response = await fetch(statsFile);
      stats = await response.json();
    } else {
      // Node environment
      const fs = await import('fs');
      const content = fs.readFileSync(statsFile, 'utf-8');
      stats = JSON.parse(content);
    }
  } else {
    stats = statsFile;
  }

  // Extract relevant information from stats
  const chunks: ChunkInfo[] = extractChunkInfo(stats);
  const modules: ModuleInfo[] = extractModuleInfo(stats);
  const duplicates: DuplicateInfo[] = findDuplicateModules(modules);
  
  // Calculate totals
  const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
  const gzippedSize = chunks.reduce((sum, chunk) => sum + chunk.gzippedSize, 0);
  const moduleCount = modules.length;

  // Get largest modules (top 10)
  const largestModules = modules
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  // Generate recommendations
  const recommendations = generateRecommendations({
    chunks,
    modules,
    duplicates,
    totalSize,
    gzippedSize
  });

  return {
    totalSize,
    gzippedSize,
    moduleCount,
    chunks,
    largestModules,
    duplicates,
    recommendations
  };
}

/**
 * Extract chunk information from bundle stats
 */
function extractChunkInfo(stats: any): ChunkInfo[] {
  const chunks: ChunkInfo[] = [];
  
  if (stats.chunks) {
    for (const chunk of stats.chunks) {
      chunks.push({
        name: chunk.names?.[0] || chunk.id || 'unknown',
        size: chunk.size || 0,
        gzippedSize: estimateGzippedSize(chunk.size || 0),
        modules: chunk.modules?.map((m: any) => m.name || m.identifier) || [],
        isEntry: chunk.entry || false,
        isDynamic: chunk.initial === false
      });
    }
  }

  return chunks;
}

/**
 * Extract module information from bundle stats
 */
function extractModuleInfo(stats: any): ModuleInfo[] {
  const modules: ModuleInfo[] = [];
  const moduleMap = new Map<string, ModuleInfo>();

  if (stats.modules) {
    for (const module of stats.modules) {
      const name = cleanModuleName(module.name || module.identifier);
      const size = module.size || 0;
      
      if (moduleMap.has(name)) {
        // Aggregate duplicate modules
        const existing = moduleMap.get(name)!;
        existing.size += size;
        existing.gzippedSize = estimateGzippedSize(existing.size);
      } else {
        moduleMap.set(name, {
          name,
          size,
          gzippedSize: estimateGzippedSize(size),
          chunks: module.chunks || [],
          isExternal: isExternalModule(name)
        });
      }
    }
  }

  return Array.from(moduleMap.values());
}

/**
 * Find duplicate modules across chunks
 */
function findDuplicateModules(modules: ModuleInfo[]): DuplicateInfo[] {
  const moduleOccurrences = new Map<string, { count: number; size: number; chunks: Set<string> }>();

  for (const module of modules) {
    const baseName = getBaseModuleName(module.name);
    
    if (!moduleOccurrences.has(baseName)) {
      moduleOccurrences.set(baseName, {
        count: 0,
        size: module.size,
        chunks: new Set()
      });
    }

    const occurrence = moduleOccurrences.get(baseName)!;
    occurrence.count++;
    module.chunks.forEach(chunk => occurrence.chunks.add(chunk));
  }

  return Array.from(moduleOccurrences.entries())
    .filter(([_, info]) => info.count >= THRESHOLDS.DUPLICATE_THRESHOLD)
    .map(([module, info]) => ({
      module,
      occurrences: info.count,
      totalSize: info.size * info.count,
      chunks: Array.from(info.chunks)
    }))
    .sort((a, b) => b.totalSize - a.totalSize);
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(data: {
  chunks: ChunkInfo[];
  modules: ModuleInfo[];
  duplicates: DuplicateInfo[];
  totalSize: number;
  gzippedSize: number;
}): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Check total bundle size
  if (data.totalSize > THRESHOLDS.TOTAL_SIZE_ERROR) {
    recommendations.push({
      type: 'error',
      category: 'bundle-size',
      message: `Total bundle size (${formatSize(data.totalSize)}) is very large`,
      impact: 'high',
      solution: 'Consider implementing code splitting and lazy loading'
    });
  } else if (data.totalSize > THRESHOLDS.TOTAL_SIZE_WARNING) {
    recommendations.push({
      type: 'warning',
      category: 'bundle-size',
      message: `Total bundle size (${formatSize(data.totalSize)}) is getting large`,
      impact: 'medium',
      solution: 'Consider optimizing large dependencies'
    });
  }

  // Check individual chunk sizes
  for (const chunk of data.chunks) {
    if (chunk.size > THRESHOLDS.CHUNK_SIZE_ERROR) {
      recommendations.push({
        type: 'error',
        category: 'code-splitting',
        message: `Chunk "${chunk.name}" (${formatSize(chunk.size)}) is too large`,
        impact: 'high',
        solution: 'Split this chunk into smaller pieces'
      });
    } else if (chunk.size > THRESHOLDS.CHUNK_SIZE_WARNING) {
      recommendations.push({
        type: 'warning',
        category: 'code-splitting',
        message: `Chunk "${chunk.name}" (${formatSize(chunk.size)}) is getting large`,
        impact: 'medium',
        solution: 'Consider splitting this chunk'
      });
    }
  }

  // Check for large modules
  const largeModules = data.modules.filter(m => m.size > THRESHOLDS.MODULE_SIZE_WARNING);
  for (const module of largeModules) {
    recommendations.push({
      type: 'warning',
      category: 'tree-shaking',
      message: `Module "${module.name}" (${formatSize(module.size)}) is large`,
      impact: 'medium',
      solution: 'Check if you can import only needed parts or find lighter alternatives'
    });
  }

  // Check for duplicates
  for (const duplicate of data.duplicates) {
    recommendations.push({
      type: 'warning',
      category: 'duplicates',
      message: `"${duplicate.module}" appears ${duplicate.occurrences} times (${formatSize(duplicate.totalSize)})`,
      impact: duplicate.totalSize > 50 * 1024 ? 'high' : 'medium',
      solution: 'Consider extracting to a shared chunk or vendor bundle'
    });
  }

  // Check for potential tree-shaking opportunities
  const externalModules = data.modules.filter(m => m.isExternal);
  const largeExternals = externalModules.filter(m => m.size > 50 * 1024);
  
  if (largeExternals.length > 0) {
    recommendations.push({
      type: 'info',
      category: 'tree-shaking',
      message: `Found ${largeExternals.length} large external dependencies`,
      impact: 'medium',
      solution: 'Verify that tree-shaking is working properly for these modules'
    });
  }

  return recommendations.sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 };
    return impactOrder[b.impact] - impactOrder[a.impact];
  });
}

/**
 * Utility functions
 */

function cleanModuleName(name: string): string {
  // Remove webpack loaders and query strings
  return name.replace(/^.*!/, '').split('?')[0];
}

function isExternalModule(name: string): boolean {
  return name.includes('node_modules') || !name.startsWith('./') && !name.startsWith('/');
}

function getBaseModuleName(name: string): string {
  // Extract package name from module path
  const cleaned = cleanModuleName(name);
  const parts = cleaned.split('/');
  
  if (parts[0] === 'node_modules') {
    // Handle scoped packages
    if (parts[1].startsWith('@')) {
      return `${parts[1]}/${parts[2]}`;
    }
    return parts[1];
  }
  
  return cleaned;
}

function estimateGzippedSize(size: number): number {
  // Rough estimate: gzipped size is typically 25-30% of original
  return Math.round(size * 0.27);
}

function formatSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Get bundle analysis summary for quick insights
 */
export function getBundleSummary(stats: BundleStats): string {
  const lines = [
    `📦 Bundle Analysis Summary`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Total Size: ${formatSize(stats.totalSize)} (${formatSize(stats.gzippedSize)} gzipped)`,
    `Modules: ${stats.moduleCount}`,
    `Chunks: ${stats.chunks.length}`,
    ``
  ];

  if (stats.recommendations.length > 0) {
    lines.push(`🔍 Recommendations:`);
    for (const rec of stats.recommendations.slice(0, 5)) {
      const icon = rec.type === 'error' ? '❌' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
      lines.push(`${icon} ${rec.message}`);
      if (rec.solution) {
        lines.push(`   💡 ${rec.solution}`);
      }
    }
  }

  if (stats.largestModules.length > 0) {
    lines.push(``, `📊 Largest Modules:`);
    for (const module of stats.largestModules.slice(0, 5)) {
      lines.push(`   ${formatSize(module.size)} - ${module.name}`);
    }
  }

  return lines.join('\n');
}

export default {
  analyzeBundleStats,
  getBundleSummary
}; 