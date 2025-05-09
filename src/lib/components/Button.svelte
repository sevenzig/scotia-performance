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
    children = () => ""
  } = $props<{
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
    onClick?: (event: MouseEvent) => void;
    children?: () => any;
  }>();

  // State using $state rune with let for mutability
  let isHovered = $state(false);
  
  // Derived state using $derived rune
  const buttonStyles = $derived({
    backgroundColor: isHovered && !disabled && variant === 'primary' 
      ? '#154880' 
      : null,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto'
  });

  // Event handlers with runes syntax
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
  
  function handleClick(event: MouseEvent) {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  }
</script>

<button
  {type}
  class={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''}`}
  disabled={disabled || loading}
  onclick={handleClick}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  style={`
    background-color: ${buttonStyles.backgroundColor || ''}; 
    opacity: ${buttonStyles.opacity}; 
    width: ${buttonStyles.width};
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
  }
  
  /* Button Variants */
  .btn-primary {
    background-color: var(--scotia-blue);
    color: var(--white);
  }
  
  .btn-secondary {
    background-color: var(--scotia-red);
    color: var(--white);
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