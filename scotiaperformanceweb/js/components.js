// Component loader
class ComponentLoader {
    constructor() {
        this.components = {
            'megamenu': 'megamenu-container',
            'hero': 'hero-container',
            'footer': 'footer-container'
        };
        this.loaded = false;
    }

    async loadComponents() {
        // Don't load components more than once
        if (this.loaded) {
            console.log('Components already loaded');
            return;
        }

        console.log('Loading components...');
        for (const [component, containerId] of Object.entries(this.components)) {
            try {
                const container = document.getElementById(containerId);
                if (container) {
                    // Get the current page's path relative to root
                    const basePath = this.getBasePath();
                    
                    // Try to load from separate component file first
                    const componentPath = `${basePath}components/${component}.html`;
                    try {
                        const response = await fetch(componentPath);
                        if (response.ok) {
                            const content = await response.text();
                            container.innerHTML = content;
                            console.log(`Component ${component} loaded from file: ${componentPath}`);
                            continue;
                        }
                    } catch (error) {
                        console.log(`Could not load ${component} from file, falling back to template`);
                    }

                    // Fallback to template in HTML
                    const template = document.getElementById(`${component}-template`);
                    if (template) {
                        container.innerHTML = template.innerHTML;
                        console.log(`Component ${component} loaded from template`);
                    }
                }
            } catch (error) {
                console.error(`Error loading component ${component}:`, error);
            }
        }
        
        // Mark as loaded and dispatch event
        this.loaded = true;
        
        // Dispatch event indicating components are loaded
        const event = new CustomEvent('componentsLoaded');
        document.dispatchEvent(event);
        console.log('All components loaded, dispatched componentsLoaded event');
    }
    
    // Determine the correct base path for component loading
    getBasePath() {
        // Get the current path
        const currentPath = window.location.pathname;
        
        // Count the number of directory levels from root
        const parts = currentPath.split('/').filter(part => part.length > 0);
        
        // Build the relative path back to root
        if (parts.length <= 1) {
            return '/'; // Already at root level
        } else {
            return '../'.repeat(parts.length - 1);
        }
    }
}

// Create a singleton instance
const componentLoader = new ComponentLoader();

// Initialize and load components when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await componentLoader.loadComponents();
}); 