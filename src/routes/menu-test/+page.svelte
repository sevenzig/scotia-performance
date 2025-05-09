<script>
  // Simple state for testing
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    console.log('Menu toggled:', isMenuOpen);
  }
</script>

<div class="test-container">
  <h1>Menu Test Page</h1>
  
  <div class="menu-container">
    <button 
      class="menu-toggle" 
      on:click={toggleMenu}
      aria-expanded={isMenuOpen}
    >
      Toggle Menu {isMenuOpen ? '▲' : '▼'}
    </button>
    
    <div class="mega-menu {isMenuOpen ? 'open' : ''}">
      <div class="menu-content">
        <h2>Menu Content</h2>
        <p>This is a test of the mega menu functionality.</p>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .test-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .menu-container {
    position: relative;
    margin-top: 20px;
  }
  
  .menu-toggle {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .mega-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 300px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    padding: 15px;
    margin-top: 5px;
    z-index: 100;
    
    /* Initial state - hidden */
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  .mega-menu.open {
    /* Visible state */
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
</style> 