<script lang="ts">
  // Button props using Svelte 5 runes syntax
  const { 
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    fullWidth = false,
    loading = false,
    onClick = undefined,
    children = () => "",
    noWrap = false,
    autoWidth = false
  } = $props<{
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
    onClick?: (event: MouseEvent) => void;
    children?: () => any;
    noWrap?: boolean;
    autoWidth?: boolean;
  }>();

  // Event handlers with runes syntax
  function handleClick(event: MouseEvent) {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  }
</script>

<button
  {type}
  class={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''} ${noWrap ? 'btn-no-wrap' : ''} ${autoWidth ? 'btn-auto-width' : ''}`}
  disabled={disabled || loading}
  onclick={handleClick}
  style={`
    width: ${fullWidth ? '100%' : autoWidth ? 'auto' : 'auto'};
    opacity: ${disabled ? 0.6 : 1};
  `}
>
  {#if loading}
    <span class="loading-spinner"></span>
  {/if}
  {@render children()}
</button>

<style>
  /* Base Button */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-md);
    font-family: var(--font-primary);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-normal);
    white-space: nowrap;
    border: none;
    outline: none;
    position: relative;
    text-decoration: none;
  }
  
  /* Button Variants */
  .btn-primary {
    background-color: var(--scotia-blue);
    color: var(--white);
    text-decoration: none;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #154880;
    color: var(--white);
    text-decoration: none;
  }
  
  .btn-primary:focus:not(:disabled) {
    color: var(--white);
    text-decoration: none;
  }
  
  .btn-primary:active:not(:disabled) {
    color: var(--white);
    text-decoration: none;
  }
  
  .btn-primary:visited {
    color: var(--white);
    text-decoration: none;
  }
  
  .btn-secondary {
    background-color: var(--scotia-red);
    color: var(--white);
    border: none;
  }
  
  /* This is the critical style for the secondary button hover */
  .btn-secondary:hover:not(:disabled) {
    background-color: #9b2c2c; /* Darker red */
  }
  
  .btn-outline {
    background-color: transparent;
    color: var(--scotia-blue);
    border: 1px solid var(--scotia-blue);
  }
  
  .btn-outline:hover:not(:disabled) {
    background-color: rgba(26, 93, 173, 0.05);
  }
  
  .btn-text {
    background-color: transparent;
    color: var(--scotia-blue);
    padding: 0;
  }
  
  .btn-text:hover:not(:disabled) {
    text-decoration: underline;
  }
  
  /* Button Sizes */
  .btn-sm {
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--font-size-sm);
    height: 32px;
  }
  
  .btn-md {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-base);
    height: 40px;
  }
  
  .btn-lg {
    padding: var(--spacing-3) var(--spacing-5);
    font-size: var(--font-size-lg);
    height: 48px;
  }
  
  /* Button States */
  .btn:disabled {
    cursor: not-allowed;
  }
  
  .btn:focus-visible {
    outline: 2px solid var(--scotia-blue);
    outline-offset: 2px;
  }

  /* Button modifiers */
  .btn-full {
    width: 100%;
  }

  .btn-no-wrap {
    white-space: nowrap;
  }

  .btn-auto-width {
    width: auto;
    min-width: max-content;
  }
  
  /* Loading State */
  .btn-loading {
    position: relative;
    color: transparent;
  }
  
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: var(--white);
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style> 