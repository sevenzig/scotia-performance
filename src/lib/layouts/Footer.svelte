<script lang="ts">
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  const { initialRenderComplete = true } = $props<{
    initialRenderComplete?: boolean;
  }>();
</script>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid" class:hidden={!initialRenderComplete}>
      <div class="footer-section">
        <h3>Contact Us</h3>
        <p>Scotia Performance Auto</p>
        <p>24 Sacandaga Rd, Scotia, NY 12302</p>
        <p><a href="tel:+15182801698">(518) 280-1698</a></p>
      </div>
      <div class="footer-section">
        <h3>Service Area</h3>
        <p>Scotia, Schenectady, Glenville, Rotterdam, Niskayuna, and surrounding areas.</p>
        <p><a href="/directions">Get Directions</a></p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#help">Diagnostic Help</a></li>
          <li><a href="#reviews">Reviews</a></li>
        </ul>
      </div>
    </div>
    <div class="copyright" class:minimal={!initialRenderComplete}>
      <p>&copy; {currentYear} Scotia Performance Auto. All rights reserved.</p>
    </div>
  </div>
</footer>

<style lang="scss">
  @use '../../scss/core/_mixins' as *;
  @use '../../scss/core/_variables' as *;
  
  .site-footer {
    background-color: $scotia-dark;
    color: $white;
    padding: $spacing-8 $spacing-4;
    
    @include md {
      padding: $spacing-12 $spacing-6;
    }
    
    a {
      color: $white;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: $spacing-8;
      margin-bottom: $spacing-8;
      transition: opacity 0.3s ease;
      
      &.hidden {
        opacity: 0;
        visibility: hidden;
        height: 0;
        overflow: hidden;
        margin-bottom: 0;
      }
      
      @include md {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .footer-section {
      h3 {
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        color: $scotia-light;
        margin-bottom: $spacing-4;
      }
      
      p {
        margin-bottom: $spacing-2;
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
          margin-bottom: $spacing-2;
        }
      }
    }
    
    .copyright {
      border-top: 1px solid rgba($white, 0.2);
      padding-top: $spacing-4;
      text-align: center;
      font-size: $font-size-sm;
      
      &.minimal {
        border-top: none;
      }
    }
  }
</style> 