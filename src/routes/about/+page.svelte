<script lang="ts">
  import AboutCard from '$lib/components/AboutCard.svelte';
  import ContactCard from '$lib/components/ContactCard.svelte';
  import BusinessHoursCard from '$lib/components/BusinessHoursCard.svelte';
  
  // Define the business hours type
  type BusinessHours = {
    day: string;
    hours: string;
  };
  
  // Create a simple business hours service directly in this file
  const businessHoursService = {
    getBusinessHours(): BusinessHours[] {
      return [
        { day: "Monday", hours: "8:00 AM - 5:00 PM" },
        { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
        { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
        { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
        { day: "Friday", hours: "8:00 AM - 5:00 PM" },
        { day: "Saturday", hours: "Closed" },
        { day: "Sunday", hours: "Closed" }
      ];
    },
    
    getCurrentStatus(): { isOpen: boolean; message: string } {
      const date = new Date();
      const day = date.getDay();
      const hours = date.getHours();
      
      // Basic implementation
      const isOpen = day >= 1 && day <= 5 && hours >= 8 && hours < 17;
      const message = isOpen ? "Open today until 5PM" : "Currently closed";
      
      return { isOpen, message };
    }
  };
  
  // Service data
  const services = [
    {
      title: "Professional Auto Repair",
      description: "Comprehensive auto repair services performed by skilled technicians using quality parts and proper procedures.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>`
    },
    {
      title: "Honest Diagnostics",
      description: "Accurate, thorough diagnostics to identify the root cause of issues, preventing unnecessary repairs and expenses.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>`
    },
    {
      title: "Ethical Service",
      description: "Committed to fair treatment, transparent pricing, and ensuring you understand all repairs before work begins.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`
    }
  ];
  
  // Get business hours from service
  const businessHours = businessHoursService.getBusinessHours();
  
  // Get current status for display
  const currentStatus = businessHoursService.getCurrentStatus();
  
  // Testimonial data
  const testimonial = {
    quote: "I have complete trust in Scotia Performance. I always leave my car knowing it will be well taken care of and that I will be treated fairly. A+ rating all around!",
    author: "Local Customer",
    rating: 5,
    readMoreLink: "https://www.google.com/maps/place/Scotia+Performance/@42.8331651,-73.9587091,15z/data=!4m7!3m6!1s0x89de70f8a1cd47c7:0x3f46bd00a6a32810!8m2!3d42.8331651!4d-73.9587091!9m1!1b1"
  };
  
  // Generate stars based on rating
  const stars = "★".repeat(testimonial.rating) + "☆".repeat(5 - testimonial.rating);

  // Define What We Offer items
  const offerings = [
    { title: "Professional service", icon: "check" },
    { title: "Honest and fair treatment", icon: "check" },
    { title: "Reliable repairs", icon: "check" },
    { title: "Ethical practices", icon: "check" },
    { title: "Peak productivity", icon: "check" }
  ];
</script>

<style>
  :global(body) {
    font-family: 'Montserrat', sans-serif;
  }
  
  .hero-banner {
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/images/garage.jpg');
    background-size: cover;
    background-position: center;
    color: white;
    width: 100%;
    padding: 0;
    border-radius: 0;
    height: 40vh;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
  
  .icon-container {
    width: 36px;
    height: 36px;
    margin: 0 auto 0.75rem auto;
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
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1f2937;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .offering-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #212121;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 0.5rem;
  }
  
  .offering-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .tabs-container {
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }
  
  .tab {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .tab.active {
    font-weight: 600;
    border-bottom: 2px solid #3b82f6;
  }
</style>

<svelte:head>
  <title>About Us | Scotia Performance</title>
  <meta name="description" content="Scotia Performance is a professional auto repair station in Scotia, NY, dedicated to honest service, quality repairs, and customer satisfaction." />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<!-- Hero Section - Full Height -->
<section class="hero-banner">
  <div class="text-center px-4">
    <h1 class="text-3xl md:text-4xl font-bold mb-2">Scotia Performance</h1>
    <div class="divider bg-white h-0.5 opacity-30 my-2 max-w-xs mx-auto"></div>
    <p class="text-md md:text-lg">Your trusted partner for professional auto repair in Scotia, NY</p>
  </div>
</section>

<div class="content-container">
  <!-- Section Title -->
  <h2 class="section-title">About Scotia Performance</h2>
  
  <!-- Tabs -->
  <div class="tabs-container">
    <div class="tab active">About Scotia</div>
    <div class="tab">Our Work</div>
    <div class="tab">Automotive Repairs</div>
    <div class="tab">Scheduling Details</div>
    <div class="tab">Automotive Brand</div>
  </div>
  
  <!-- Main content -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
    <div class="lg:col-span-2">
      <!-- About card component -->
      <AboutCard {currentStatus} />
    </div>
    
    <div class="lg:col-span-1 flex flex-col gap-6">
      <!-- Contact card component -->
      <div class="mb-4">
        <ContactCard />
      </div>
      
      <!-- Business hours component -->
      <div>
        <BusinessHoursCard {businessHours} />
      </div>
      
      <!-- Testimonial -->
      <div class="card bg-base-100 shadow-md mt-4">
        <div class="card-body p-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="card-title text-lg">Customer Review</h2>
            <div class="text-warning text-sm">
              {stars}
            </div>
          </div>
          
          <div class="italic text-sm">
            "{testimonial.quote}"
          </div>
          
          <div class="text-right mt-2 text-sm font-medium">
            - {testimonial.author}
          </div>
          
          <div class="mt-2">
            <a href={testimonial.readMoreLink} class="text-sm link link-primary" target="_blank">
              Read more reviews on Google
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- What We Offer Section -->
  <h2 class="section-title">What We Offer</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
    {#each offerings as offering}
      <div class="offering-item">
        <div class="offering-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-sm font-medium">{offering.title}</span>
      </div>
    {/each}
  </div>
  
  <!-- Our Services Section -->
  <h2 class="section-title">Our Services</h2>
  <p class="text-center mb-6">
    At Scotia Performance, we're committed to providing reliable, honest, and high-quality automotive services.
  </p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    {#each services as service}
      <div class="card bg-base-100 shadow-md service-card">
        <div class="card-body p-6 items-center text-center">
          <div class="icon-container text-primary mb-4">
            {@html service.icon}
          </div>
          <h3 class="card-title mb-2">{service.title}</h3>
          <p class="text-sm">{service.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div> 