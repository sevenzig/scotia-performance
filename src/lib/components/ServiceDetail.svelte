<script lang="ts">
  const { title, description, icon, isReversed = false, children } = $props<{
    title: string;
    description: string;
    icon?: string;
    isReversed?: boolean;
    children?: {
      actions?: () => unknown;
      image?: () => unknown;
    };
  }>();
</script>

<div class="service-detail" class:reversed={isReversed}>
  <div class="detail-content">
    <h3>{title}</h3>
    <p>{description}</p>
    {#if children?.actions}
      <div class="actions">
        {@render children.actions()}
      </div>
    {/if}
  </div>
  
  <div class="detail-image">
    {#if icon}
      <div class="icon-container">
        <div class="placeholder-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            {@html icon}
          </svg>
        </div>
      </div>
    {:else if children?.image}
      {@render children.image()}
    {:else}
      <div class="placeholder-image"></div>
    {/if}
  </div>
</div>

<style>
  .service-detail {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    .service-detail {
      flex-direction: row;
      align-items: center;
    }
    
    .service-detail.reversed {
      flex-direction: row-reverse;
    }
  }
  
  .detail-content {
    flex: 1;
  }
  
  .detail-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ac2f33;
    margin-bottom: 0.75rem;
  }
  
  .detail-content p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .detail-content .actions {
    margin-top: 1rem;
  }
  
  .detail-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .placeholder-image {
    width: 100%;
    aspect-ratio: 16/9;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  
  .icon-container {
    width: 100%;
    aspect-ratio: 1;
    max-width: 240px;
    background-color: #f0f0f0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .placeholder-icon {
    font-size: 2rem;
    color: #ac2f33;
  }
</style> 