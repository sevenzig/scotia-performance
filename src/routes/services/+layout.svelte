<script lang="ts">
  const { children } = $props();
</script>

<div class="services-layout">
  <div class="container mx-auto">
    {@render children()}
  </div>
</div>

<style lang="scss">
  @use '../../scss/core/_variables' as vars;
  
  .services-layout {
    background-color: vars.$white;
    min-height: 60vh;
  }
</style> 