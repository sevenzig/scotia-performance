<script lang="ts">
  // Props
  const { 
    address = "24 Sacandaga Rd, Scotia, NY 12302, USA",
    phone = "(518) 280-1698",
    email = "info@scotiaperf.com",
    website = "https://scotiaperformance.com"
  } = $props<{
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  }>();
</script>

<div class="card bg-base-100 shadow-md h-full">
  <div class="card-body p-4">
    <h2 class="card-title text-lg mb-2" style="border: none; border-bottom: none; text-decoration: none; box-shadow: none;">Contact Us</h2>
    
    <div class="space-y-2">
      <p class="flex items-start gap-2 text-sm">
        <span class="contact-icon text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </span>
        <a href="https://maps.google.com/?q={encodeURIComponent(address)}" target="_blank" class="hover:underline">
          {address}
        </a>
      </p>
      
      <p class="flex items-center gap-2 text-sm">
        <span class="contact-icon text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </span>
        <a href="tel:{phone.replace(/\D/g, '')}" class="hover:underline">{phone}</a>
      </p>
      
      <p class="flex items-center gap-2 text-sm">
        <span class="contact-icon text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </span>
        <a href="mailto:{email}" class="hover:underline">{email}</a>
      </p>
      
      <div class="divider my-2"></div>
      
      <a href={website} class="btn btn-sm btn-outline btn-primary w-full">Visit Website</a>
    </div>
  </div>
</div>

<style>
  .contact-icon {
    width: 20px;
    height: 20px;
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Remove any potential underlines */
  .card-title {
    border: none !important;
    border-bottom: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
  }
  
  /* Target pseudo elements that might be creating underlines */
  .card-title::after,
  .card-title::before {
    display: none !important;
    content: none !important;
    border: none !important;
    background: none !important;
  }
</style> 