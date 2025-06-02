<script lang="ts">
  const { 
    title = 'Ready to get started?', 
    description = 'Contact us today to schedule your service or learn more about how we can help with your automotive needs.',
    phone = '(518) 280-1698',
    buttonText = 'Schedule Service',
    secondaryAction = undefined,
    fullWidth = false,
    noBorderRadius = false,
    customPadding = undefined,
    customMargin = undefined
  } = $props<{
    title?: string;
    description?: string;
    phone?: string;
    buttonText?: string;
    secondaryAction?: (() => string) | (() => any);
    fullWidth?: boolean;
    noBorderRadius?: boolean;
    customPadding?: string;
    customMargin?: string;
  }>();
</script>

<div 
  class="cta-section" 
  class:full-width={fullWidth}
  class:no-border-radius={noBorderRadius}
  style:padding={customPadding}
  style:margin={customMargin}
>
  <div class="cta-content">
    <h2>{title}</h2>
    <p>{description}</p>
    
    <div class="cta-actions">
      <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} class="cta-button">
        {buttonText}: {phone}
      </a>
      
      {#if secondaryAction}
        <div class="secondary-action">
          <a href="/services" class="text-white underline">{secondaryAction()}</a>
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
    padding: var(--spacing-8, 2rem) 0;
    border-radius: var(--border-radius, 0.25rem);
    margin: var(--spacing-12, 3rem) 0;
  }

  .cta-section.full-width {
    width: 100%;
    max-width: none;
  }

  .cta-section.no-border-radius {
    border-radius: 0;
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
  
  /* Higher specificity to override global link styles */
  .cta-actions .cta-button {
    display: inline-block;
    background-color: var(--white, #FFFFFF);
    color: var(--scotia-red, #7F1D1D);
    padding: var(--spacing-3, 0.75rem) var(--spacing-6, 1.5rem);
    border-radius: var(--border-radius, 0.25rem);
    font-weight: var(--font-weight-semibold, 600);
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  /* Higher specificity for all link states */
  .cta-actions .cta-button:link,
  .cta-actions .cta-button:visited,
  .cta-actions .cta-button:active {
    background-color: var(--white, #FFFFFF);
    color: var(--scotia-red, #7F1D1D);
    text-decoration: none;
  }

  /* Shimmer effect */
  .cta-actions .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      110deg,
      transparent 20%,
      rgba(255, 255, 255, 0.6) 40%,
      rgba(255, 255, 255, 0.6) 60%,
      transparent 80%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: 1;
    pointer-events: none;
    border-radius: var(--border-radius, 0.25rem);
    opacity: 0;
  }
  
  .cta-actions .cta-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: var(--white, #FFFFFF);
    color: var(--scotia-red, #7F1D1D);
    text-decoration: none;
  }

  .cta-actions .cta-button:focus {
    outline: none;
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(127, 29, 29, 0.3);
    background-color: var(--white, #FFFFFF);
    color: var(--scotia-red, #7F1D1D);
    text-decoration: none;
  }

  .cta-actions .cta-button:active {
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: var(--white, #FFFFFF);
    color: var(--scotia-red, #7F1D1D);
    text-decoration: none;
  }

  .cta-actions .cta-button:hover::before {
    transform: translateX(100%);
    opacity: 1;
  }

  .cta-actions .cta-button:not(:hover)::before {
    transform: translateX(-100%);
    opacity: 0;
    transition: transform 0s, opacity 0.2s ease;
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