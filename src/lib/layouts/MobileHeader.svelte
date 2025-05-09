<script lang="ts">
  // Component script - can be empty if no logic is needed
</script>

<header class="mobile-header">
  <div class="header-container">
    <div class="logo-container">
      <span class="logo-text">Scotia Performance</span>
    </div>
    <a href="tel:5182801698" class="header-phone">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <span>(518) 280-1698</span>
    </a>
  </div>
</header>

<style lang="scss">
  .mobile-header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .logo-container {
    .logo-text {
      font-weight: bold;
      font-size: 1.25rem;
      color: #003366; // Consider using SCSS variables if available
    }
  }

  .header-phone {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: inherit;
    text-decoration: none;
    font-weight: 500;

    svg {
      flex-shrink: 0;
    }

    &:hover {
      color: #003366; // Consider using SCSS variables if available
    }
  }
</style> 