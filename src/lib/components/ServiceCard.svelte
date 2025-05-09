<script lang="ts">
  const { title, description, link = '#', icon = null } = $props<{
    title: string;
    description: string;
    link?: string;
    icon?: string | null;
  }>();
</script>

<div class="service-card">
  {#if icon}
    <div class="service-card__icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {@html icon}
      </svg>
    </div>
  {/if}
  <h3 class="service-card__title">{title}</h3>
  <p class="service-card__description">{description}</p>
  <a href={link} class="service-card__link">Learn More</a>
</div>

<style>
  .service-card {
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .service-card__icon {
    margin-bottom: 0.75rem;
    color: #1A5DAD;
  }
  
  .service-card__icon svg {
    width: 48px;
    height: 48px;
  }
  
  .service-card__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.25rem;
    color: #1A5DAD;
    margin-bottom: 0.5rem;
  }
  
  .service-card__description {
    color: #4B5563;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  .service-card__link {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: #1A5DAD;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    margin-top: auto;
  }
  
  .service-card__link::after {
    content: '';
    width: 6px;
    height: 6px;
    border-top: 2px solid #1A5DAD;
    border-right: 2px solid #1A5DAD;
    transform: rotate(45deg);
    margin-left: 0.25rem;
    transition: transform 0.3s ease;
  }
  
  .service-card__link:hover {
    color: #144a8a;
  }
  
  .service-card__link:hover::after {
    transform: translateX(4px) rotate(45deg);
  }
</style> 