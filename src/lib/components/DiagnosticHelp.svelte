<script lang="ts">
  // Type definitions for diagnostic information
  type DiagnosticItem = 
    | { label: string; description: string }
    | { description: string };
  
  interface DiagnosticSection {
    title: string;
    items: DiagnosticItem[];
  }
  
  // Diagnostic information data - similar to services array in ServicesOffered
  const diagnosticInfo: DiagnosticSection[] = [
    {
      title: "Vehicle Details",
      items: [
        { label: "Essential", description: "Make, model, and year" },
        { label: "Optional", description: "Current mileage reading" }
      ]
    },
    {
      title: "Issue Description",
      items: [
        { description: "Detailed description of symptoms" },
        { description: "Timeline of when issues began" },
        { description: "Frequency of occurrence" },
        { description: "Warning indicators (lights/sounds)" }
      ]
    },
    {
      title: "Operating Conditions",
      items: [
        { description: "Engine temperature state" },
        { description: "Driving environment (city/highway)" },
        { description: "Weather conditions during issues" },
        { description: "Vehicle speed during occurrence" }
      ]
    },
    {
      title: "Maintenance Background",
      items: [
        { description: "Recent repair history" },
        { description: "Regular maintenance records" },
        { description: "Previous related issues" }
      ]
    }
  ];
</script>

<section class="diagnostic-help">
  <div class="container">
    <h2>Helpful Diagnostic Information</h2>
    <div class="diagnostic-grid">
      {#each diagnosticInfo as section}
        <div class="diagnostic-card">
          <h3>{section.title}</h3>
          <ul>
            {#each section.items as item}
              <li>
                {'label' in item ? `${item.label}: ${item.description}` : item.description}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Main Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Diagnostic Help Section */
  .diagnostic-help {
    background-color: #f9fafb;
    padding: 3rem 0;
  }
  
  .diagnostic-help h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .diagnostic-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  
  .diagnostic-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .diagnostic-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .diagnostic-card h3 {
    color: #1e3a8a;
    margin-bottom: 1rem;
    font-weight: 600;
    text-align: center;
  }
  
  .diagnostic-card ul {
    padding-left: 1.5rem;
    margin: 0;
  }
  
  .diagnostic-card li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
  
  .diagnostic-card li:last-child {
    margin-bottom: 0;
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .diagnostic-card {
      transition: none;
    }
    
    .diagnostic-card:hover {
      transform: none;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .diagnostic-grid {
      grid-template-columns: 1fr;
    }
    
    .diagnostic-help {
      padding: 2rem 0;
    }
    
    .diagnostic-help h2 {
      font-size: 1.75rem;
    }
  }
</style> 