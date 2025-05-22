<script lang="ts">
  // Basic layout for components page using Svelte 5 runes
  const { children = () => null } = $props<{
    children?: () => any;
  }>();
</script>

<div class="components-layout">
  {@render children()}
</div>

<style>
  .components-layout {
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style> 