<script lang="ts">
  const { currentStatus } = $props<{
    currentStatus: { isOpen: boolean; message: string }
  }>();
</script>

<div class="about-card">
  <div class="about-card__body">
    <div class="about-card__header">
      <h2 class="about-card__title">About Scotia Performance</h2>
      <div class="about-card__ratings">
        <div class="about-card__stars">★★★★★</div>
        <span class="about-card__reviews">(26 reviews)</span>
      </div>
    </div>
    
    <div class="about-card__status about-card__status--{currentStatus.isOpen ? 'open' : 'closed'}">
      <span class="about-card__status-indicator about-card__status-indicator--{currentStatus.isOpen ? 'open' : 'closed'}"></span>
      <span class="font-medium">{currentStatus.message}</span>
    </div>
    
    <p class="about-card__text">Welcome to Scotia Performance, located at 24 Sacandaga Rd, Scotia, NY 12302, USA. As a local Auto Repair Station, we are dedicated to providing top-notch automotive services.</p>
    
    <p class="about-card__text">Scotia Performance is known for its professional and honest approach to auto repair. Customers consistently highlight the fair treatment and high-quality service they receive. The garage operates with a strong emphasis on integrity and customer satisfaction.</p>
    
    <p class="about-card__text">One customer expressed their complete trust in Scotia Performance, stating that they always leave their car knowing it will be well taken care of and that they will be treated fairly. This customer gave an A+ rating, emphasizing their overall satisfaction.</p>
    
    <p class="about-card__text">Another customer praised the garage's professional and respectable operation, highlighting the amazing service and honesty. They specifically mentioned the garage's morals and commitment to not overcharge customers, reinforcing the shop's dedication to ethical practices.</p>
  </div>
</div>
