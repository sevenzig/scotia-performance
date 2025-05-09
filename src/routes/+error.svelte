<!-- !!! THIS IS A TEST FOR src/routes/+error.svelte !!! -->
<script lang="ts">
  import { page } from '$app/stores'; // Re-added to resolve linter errors, $page usage in template needs this context.
  import Button from '$lib/components/Button.svelte';
  import { goto } from '$app/navigation';

  function goToHomepage() {
    goto('/');
  }
</script>

<div class="error-container">
  <div class="error-card">
    <h1 class="error-code">404</h1>
    <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 pb-3 mb-5 border-b-2 border-scotia-accent">Page Not Found</h2>
    <p class="text-gray-600 mb-8">
      Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the URL.
    </p>
    {#if $page.error?.message}
      <p class="text-sm text-gray-700 mt-4 mb-8">
        <strong>Error details:</strong> {$page.error.message}
      </p>
    {/if}
    <div>
      <Button variant="secondary" onClick={goToHomepage}>
        Go to Homepage
      </Button>
    </div>
  </div>
</div>

<style lang="scss">
  /* Direct CSS styling that doesn't rely on Tailwind's JIT mode */
  .error-container {
    min-height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
    /* Using the garage.jpg from the correct path */
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                      url('/images/garage.jpg');
    background-color: #111; /* Dark fallback color */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .error-card {
    background-color: white;
    padding: 2rem 2rem 4rem 2rem; /* Increased vertical padding */
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    max-width: 32rem;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .error-code {
    font-size: 8rem;
    font-weight: 800;
    color: #7f1d1d; /* scotia-red color from your tailwind config */
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    line-height: 1;
  }

  @media (min-width: 640px) {
    .error-card {
      padding: 3rem 3rem 5rem 3rem; /* Even more padding on larger screens */
    }
    
    .error-code {
      font-size: 10rem;
    }
  }
</style> 