<script lang="ts">
  type Service = {
    title: string;
    description: string;
    icon: string;
  };

  const {
    title = "Our Services",
    introduction = "We're committed to providing reliable, honest, and high-quality automotive services. Here's what makes us different:",
    services,
    ctaText = "Ready to experience our service difference?",
    ctaButtonText = "Contact Us Today",
    ctaButtonHref = "#contact"
  } = $props<{
    title?: string;
    introduction?: string;
    services: Service[];
    ctaText?: string;
    ctaButtonText?: string;
    ctaButtonHref?: string;
  }>();
</script>

<style>
  .icon-container {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .service-card {
    transition: all 0.3s ease;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  /* Additional utility classes that might be missing */
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.5rem;
  }
  
  .card-body {
    flex: 1 1 auto;
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }
  
  .bg-base-100 {
    background-color: #ffffff;
  }
  
  .bg-base-200 {
    background-color: #f8fafc;
  }
  
  .shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .text-center {
    text-align: center;
  }
  
  .text-primary {
    color: #1A5DAD;
  }
  
  .grid {
    display: grid;
  }
  
  .gap-6 {
    gap: 1.5rem;
  }
  
  .mt-10 {
    margin-top: 2.5rem;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  .mb-6 {
    margin-bottom: 1.5rem;
  }
  
  .mb-8 {
    margin-bottom: 2rem;
  }
  
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  .max-w-3xl {
    max-width: 48rem;
  }
  
  .py-10 {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  
  .btn {
    display: inline-block;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: all 0.15s ease-in-out;
  }
  
  .btn-primary {
    color: #ffffff;
    background-color: #1A5DAD;
    border-color: #1A5DAD;
  }
  
  .btn-primary:hover {
    background-color: #144a8a;
    border-color: #144a8a;
  }
  
  @media (min-width: 768px) {
    .md\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  
  @media (min-width: 1024px) {
    .lg\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  
  .items-center {
    align-items: center;
  }
  
  .text-xl {
    font-size: 1.25rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
</style>

<section class="py-10">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-3xl mb-6 text-center">{title}</h2>
      <p class="text-center mb-8 max-w-3xl mx-auto">
        {introduction}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each services as service}
          <div class="card bg-base-200 service-card">
            <div class="card-body items-center text-center">
              <div class="icon-container text-primary mb-4">
                {@html service.icon}
              </div>
              <h3 class="card-title text-xl">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="text-center mt-10">
        <p class="mb-4">{ctaText}</p>
        <a href={ctaButtonHref} class="btn btn-primary">{ctaButtonText}</a>
      </div>
    </div>
  </div>
</section> 