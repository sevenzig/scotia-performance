<script lang="ts">
  const { 
    title = 'Ready to get started?', 
    description = 'Contact us today to schedule your service or learn more about how we can help with your automotive needs.',
    phone = '(518) 280-1698',
    buttonText = 'Schedule Service',
    secondaryAction = undefined
  } = $props<{
    title?: string;
    description?: string;
    phone?: string;
    buttonText?: string;
    secondaryAction?: () => string;
  }>();
</script>

<div class="cta-section">
  <div class="cta-content">
    <h2>{title}</h2>
    <p>{description}</p>
    
    <div class="cta-actions">
      <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} class="cta-button">
        {buttonText}: {phone}
      </a>
      
      {#if secondaryAction}
        <div class="secondary-action">
          <a href="/services" class="text-white underline">{@render secondaryAction()}</a>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Scotia colors and variables */
  :root {
    --scotia-blue: #1A5DAD;
    --scotia-red: #7F1D1D;
    --scotia-light: #E7EFF9;
    --white: #FFFFFF;
    
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --spacing-6: 1.5rem;
    --spacing-8: 2rem;
    --spacing-12: 3rem;
    
    --font-size-lg: 1.125rem;
    --font-size-2xl: 1.5rem;
    
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    --border-radius: 0.25rem;
  }

  .cta-section {
    background-color: var(--scotia-red, #7F1D1D);
    color: var(--white, #FFFFFF);
    padding: var(--spacing-8, 2rem) var(--spacing-4, 1rem);
    border-radius: var(--border-radius, 0.25rem);
    margin: var(--spacing-12, 3rem) 0;
  }
  
  .cta-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .cta-content h2 {
    font-size: var(--font-size-2xl, 1.5rem);
    font-weight: var(--font-weight-bold, 700);
    margin-bottom: var(--spacing-4, 1rem);
  }
  
  .cta-content p {
    font-size: var(--font-size-lg, 1.125rem);
    margin-bottom: var(--spacing-6, 1.5rem);
    line-height: 1.6;
  }
  
  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-4, 1rem);
  }
  
  @media (min-width: 768px) {
    .cta-actions {
      flex-direction: row;
      justify-content: center;
    }
  }
  
  .cta-button {
    display: inline-block;
    background-color: var(--white, #FFFFFF);
    color: var(--scotia-red, #7F1D1D);
    padding: var(--spacing-3, 0.75rem) var(--spacing-6, 1.5rem);
    border-radius: var(--border-radius, 0.25rem);
    font-weight: var(--font-weight-semibold, 600);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .cta-button:hover {
    background-color: var(--scotia-light, #E7EFF9);
    transform: translateY(-2px);
  }
  
  .secondary-action {
    color: var(--white, #FFFFFF);
  }
  
  @media (min-width: 768px) {
    .secondary-action {
      margin-left: var(--spacing-4, 1rem);
    }
  }
</style> 