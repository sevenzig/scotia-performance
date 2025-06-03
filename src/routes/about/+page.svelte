<script lang="ts">
  import AboutCard from '$lib/components/AboutCard.svelte';
  import ContactCard from '$lib/components/ContactCard.svelte';
  import BusinessHoursCard from '$lib/components/BusinessHoursCard.svelte';
  import { businessHoursService } from '$lib/services/BusinessHoursService';
  
  // Define the business hours type
  type BusinessHours = {
    day: string;
    hours: string;
  };
  
  // Get business hours from service
  const businessHours = businessHoursService.getFormattedBusinessHours();
  
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
    { 
      title: "Professional service", 
      icon: "check",
      description: "Expert automotive technicians delivering precise, certified repairs using industry-best practices and manufacturer-approved techniques for optimal vehicle performance."
    },
    { 
      title: "Honest and fair treatment", 
      icon: "check",
      description: "Transparent pricing, detailed explanations of all repairs, and no unnecessary work—just ethical service built on trust and complete customer satisfaction."
    },
    { 
      title: "Reliable repairs", 
      icon: "check",
      description: "Dependable fixes backed by warranties, using quality parts and thorough diagnostics to ensure long-lasting solutions that keep your vehicle running smoothly."
    },
    { 
      title: "Ethical practices", 
      icon: "check",
      description: "Commitment to environmental responsibility, fair labor practices, and honest business conduct that prioritizes your interests and vehicle's integrity above all."
    }
  ];
  
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
  
  // Tab handling
  let activeTab = $state('about');
  
  const tabs = [
    { id: 'about', label: 'About Scotia' },
    { id: 'work', label: 'Our Work' },
    { id: 'repairs', label: 'Automotive Repairs' },
    { id: 'scheduling', label: 'Scheduling Details' },
    { id: 'brand', label: 'Automotive Brand' }
  ];
  
  function setActiveTab(tabId: string) {
    activeTab = tabId;
  }
  
  // Work projects for "Our Work" tab
  const projects = [
    {
      title: "Engine Rebuild - BMW M3",
      description: "Complete engine rebuild for a high-performance vehicle with custom tuning and performance verification.",
      image: "/images/placeholder-engine.jpg"
    },
    {
      title: "Transmission Overhaul - Audi A4",
      description: "Full transmission rebuild with upgraded clutch packs and valve body modifications.",
      image: "/images/placeholder-transmission.jpg"
    },
    {
      title: "Custom ECU Tuning - Subaru WRX",
      description: "Performance optimization with verified gains of 42HP and 55lb-ft torque.",
      image: "/images/placeholder-ecu.jpg"
    }
  ];
  
  // Repair services for "Automotive Repairs" tab
  const repairServices = [
    {
      title: "Engine Diagnostics & Repair",
      items: [
        "Check Engine Light Diagnostics",
        "Engine Performance Tuning",
        "Timing Belt/Chain Replacement",
        "Head Gasket Repair",
        "Engine Rebuild Services"
      ]
    },
    {
      title: "Transmission Services",
      items: [
        "Automatic Transmission Repair",
        "Manual Transmission Service",
        "Clutch Replacement",
        "Transmission Fluid Exchange",
        "Transfer Case Repair"
      ]
    },
    {
      title: "Electrical Systems",
      items: [
        "Computer Diagnostics",
        "Battery/Charging System Service",
        "Starter & Alternator Repair",
        "Electrical Short Diagnosis",
        "Wiring Harness Repair"
      ]
    }
  ];
  
  // Scheduling info for "Scheduling Details" tab
  const schedulingInfo = {
    howTo: [
      "Call our main line at (518) 280-1698 during business hours",
      "Drop by our shop for quick estimates and scheduling"
    ],
    leadTimes: [
      { service: "Oil Changes", time: "Same day service available" },
      { service: "Brake Service", time: "1-2 business days" },
      { service: "Major Engine Work", time: "3-7 business days" },
      { service: "Diagnostic Services", time: "Typically same day" },
      { service: "Transmission Service", time: "2-3 business days" }
    ],
    policies: [
      "24-hour cancellation notice required"
    ]
  };
  
  // Brand information for "Automotive Brand" tab
  const brandInfo = {
    specialized: ["BMW", "Audi", "Volkswagen", "Mercedes", "Porsche"],
    allMakes: [
      "Domestic vehicles (Ford, Chevrolet, Dodge)",
      "Japanese imports (Toyota, Honda, Nissan, Subaru)",
      "Other European makes (Volvo, MINI)"
    ],
    parts: [
      "OEM (Original Equipment Manufacturer) parts",
      "High-quality aftermarket alternatives",
      "Performance upgrades",
      "Custom fabrication capabilities"
    ]
  };
  
  function handleKeydown(e: KeyboardEvent, tabId: string) {
    if (e.key === 'Enter') {
      setActiveTab(tabId);
    }
  }
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
    margin-bottom: 2rem; /* Increased margin */
  }
  
  .icon-container {
    width: 40px; /* Slightly larger */
    height: 40px; /* Slightly larger */
    margin: 0 auto 1rem auto; /* Increased bottom margin */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .service-card {
    transition: all 0.3s ease;
    height: 100%; /* Make cards equal height */
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .section-title {
    font-size: 1.75rem; /* Larger font */
    font-weight: 600;
    margin-bottom: 1.5rem; /* Increased margin */
    color: #1f2937;
    padding-bottom: 0.5rem; /* Increased padding */
    /* Removed border-bottom */
  }
  
  .offering-circle {
    width: 32px; /* Smaller circle for 24x24 icon */
    height: 32px; /* Smaller circle for 24x24 icon */
    border-radius: 50%;
    background-color: #212121;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 0.75rem; /* Increased margin */
  }
  
  .offering-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem; /* Increased padding */
  }
  
  .offering-description {
    font-size: 0.875rem;
    color: #4b5563;
    margin-top: 0.5rem;
    line-height: 1.4;
  }
  
  .content-container {
    max-width: 100%; /* Use full width */
    margin: 0 auto;
    padding: 2.5rem 1.5rem; /* Increased padding */
  }
  
  /* Adjust width to 80% on desktop */
  @media (min-width: 1024px) {
    .content-container {
      width: 80%;
      margin: 0 auto;
    }
  }
  
  /* Ensure What We Offer section shows 4 columns properly */
  @media (min-width: 768px) {
    .offerings-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .tabs-container {
    display: flex;
    margin-bottom: 1.5rem; /* Increased margin */
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.75rem; /* Increased padding */
    overflow-x: auto; /* Allow scrolling on mobile */
  }
  
  .tab {
    padding: 0.6rem 1.2rem; /* Increased padding */
    margin-right: 0.75rem; /* Increased margin */
    cursor: pointer;
    font-size: 0.875rem;
    white-space: nowrap; /* Prevent wrapping */
  }
  
  .tab.active {
    font-weight: 600;
    border-bottom: 2px solid #3b82f6;
  }
  
  /* Add spacing between sections */
  .section-spacer {
    margin-bottom: 3rem;
  }
  
  /* Project card styling */
  .project-card {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }
  
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .project-image {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }
  
  /* List styling */
  .repair-list {
    list-style-type: none;
    padding-left: 0;
  }
  
  .repair-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    align-items: center;
  }
  
  .repair-list li:before {
    content: "•";
    color: #3b82f6;
    font-weight: bold;
    display: inline-block; 
    width: 1.5rem;
  }
  
  /* Schedule table styling */
  .schedule-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }
  
  .schedule-table th, 
  .schedule-table td {
    padding: 0.75rem 1rem;
    text-align: left;
  }
  
  .schedule-table tr:nth-child(odd) td {
    background-color: #f9fafb;
  }
  
  .schedule-table th {
    background-color: #f3f4f6;
    font-weight: 600;
  }
  
  /* Brand pill styling */
  .brand-pill {
    background-color: #e5e7eb;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    display: inline-block;
    font-size: 0.875rem;
  }
  
  /* Remove underlines from card titles */
  .card-title {
    border-bottom: none !important;
  }
  
  /* For full width centering */
  .full-width-center {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Card spacing */
  .card-wrapper {
    margin-bottom: 1.5rem;
  }
  
  /* Hide visit website button in ContactCard */
  :global(.contact-card a.btn) {
    display: none !important;
  }
  
  /* Reduce business hours text size and spacing */
  :global(.business-hours) {
    font-size: 0.875rem;
  }
  
  :global(.business-hours tr td) {
    padding: 0.5rem 0.75rem;
  }
  
  :global(.business-hours .day-column) {
    width: 110px;
  }
  
  :global(.business-hours .hours-column) {
    width: auto;
  }
  
  /* Card body padding adjustment */
  :global(.card-body) {
    padding: 1.25rem !important;
  }
  
  /* Improve contact card spacing */
  :global(.contact-item) {
    margin-bottom: 0.75rem !important;
  }
  
  :global(.section-title) {
    margin-bottom: 1rem !important;
  }
  
  /* Remove underlines from all component titles */
  :global(.card-title),
  :global(.section-title),
  :global(h2),
  :global(h3) {
    border-bottom: none !important;
    border: none !important;
  }
  
  /* Ensure all underlines are removed from headings */
  :global(.about-card h2),
  :global(.contact-card h3),
  :global(.business-hours-card h3) {
    border-bottom: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
  }
  
  /* Add a class for centered grid container */
  .centered-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    .centered-grid-container {
      grid-template-columns: 1fr;
    }
  }
  
  /* Brand tab container styles */
  .brand-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  /* About tab container styling */
  .about-container {
    max-width: 900px;
    margin: 0 auto;
  }
  
  /* Additional selectors to remove all possible underlines in About tab components */
  :global(.about-container h1),
  :global(.about-container h2),
  :global(.about-container h3),
  :global(.about-container h4),
  :global(.about-container .card-title),
  :global(.about-container .section-title),
  :global(AboutCard h2),
  :global(ContactCard h3),
  :global(BusinessHoursCard h3),
  :global(.card h2),
  :global(.card h3),
  :global(.tab-content h2),
  :global(.tab-content h3) {
    border-bottom: none !important;
    border: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
  }
  
  /* Force no border on all headings with !important */
  h1, h2, h3, h4 {
    border: none !important;
    border-bottom: none !important;
  }
  
  /* Override any component-specific styling for headings */
  :global(.about-card) :global(h2),
  :global(.contact-card) :global(h3),
  :global(.business-hours-card) :global(h3) {
    border: none !important;
    border-bottom: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
  }
  
  /* Super aggressive CSS to remove underlines */
  :global(*) {
    border-bottom: none !important;
    border-left: none !important;
    border-right: none !important;
    border-top: none !important;
    border: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
  
  :global(h1),
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5),
  :global(h6),
  :global(.card-title),
  :global(.section-title),
  :global(.heading),
  :global(.title) {
    border-bottom: none !important;
    border: none !important;
    text-decoration: none !important;
    text-decoration-color: transparent !important;
    box-shadow: none !important;
    outline: none !important;
  }
  
  /* Target AboutCard specifically */
  :global(AboutCard), 
  :global(.about-card), 
  :global(#aboutCard),
  :global([data-component="AboutCard"]) {
    border: none !important;
  }
  
  :global(AboutCard) :global(h1),
  :global(AboutCard) :global(h2),
  :global(AboutCard) :global(h3),
  :global(AboutCard) :global(h4),
  :global(.about-card) :global(h1),
  :global(.about-card) :global(h2),
  :global(.about-card) :global(h3),
  :global(.about-card) :global(h4) {
    border: none !important;
    border-bottom: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
  }
  
  :global(.card-body *) {
    border: none !important;
    border-bottom: none !important;
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
    <h1 class="text-3xl md:text-5xl font-bold mb-3">Scotia Performance</h1>
    <div class="divider bg-white h-0.5 opacity-30 my-3 max-w-xs mx-auto"></div>
    <p class="text-md md:text-lg">Your trusted partner for professional auto repair in Scotia, NY</p>
  </div>
</section>

<div class="content-container">
  <!-- Section Title -->
  <div class="full-width-center">
    <h2 class="section-title">About Scotia Performance</h2>
    
    <!-- Tabs -->
    <div class="tabs-container">
      {#each tabs as tab}
        <div 
          class="tab {activeTab === tab.id ? 'active' : ''}" 
          onclick={() => setActiveTab(tab.id)}
          role="tab"
          tabindex="0"
          onkeydown={(e: KeyboardEvent) => handleKeydown(e, tab.id)}
        >
          {tab.label}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- About Scotia expanded description -->
  <div class="mb-6">
    <p class="text-center">
      Established in 2005, Scotia Performance has been providing exceptional automotive repair and maintenance 
      services to the capital region for nearly two decades. Our team of certified technicians brings over 75 years 
      of combined experience, specializing in European and performance vehicles while servicing all makes and models. 
      We pride ourselves on transparent practices, honest assessments, and building long-term relationships with our clients.
    </p>
  </div>
  
  <!-- Tab Content -->
  <div class="tab-content section-spacer">
    <!-- About Tab -->
    {#if activeTab === 'about'}
      <div class="about-container">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <!-- About card component -->
            <AboutCard />
          </div>
          
          <div class="lg:col-span-1">
            <!-- Contact card component -->
            <div class="card-wrapper">
              <ContactCard />
            </div>
            
            <!-- Business hours component -->
            <div class="card-wrapper">
              <BusinessHoursCard {businessHours} />
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Our Work Tab -->
    {#if activeTab === 'work'}
      <div>
        <p class="text-center mb-8">
          At Scotia Performance, we take pride in our workmanship. Below are some recent projects 
          that showcase our expertise and attention to detail.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {#each projects as project}
            <div class="project-card">
              <img 
                src={project.image} 
                alt={project.title}
                class="project-image"
              />
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">{project.title}</h3>
                <p class="text-sm text-gray-600">{project.description}</p>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="text-center mt-8">
          <a href="/portfolio" class="btn btn-primary">View Full Portfolio</a>
        </div>
      </div>
    {/if}
    
    <!-- Automotive Repairs Tab -->
    {#if activeTab === 'repairs'}
      <div>
        <p class="text-center mb-8">
          Our comprehensive range of automotive repair services covers everything from 
          routine maintenance to complex diagnostics and performance upgrades.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {#each repairServices as service}
            <div class="card bg-base-100 shadow-md h-full">
              <div class="card-body p-6">
                <h3 class="card-title text-lg mb-4">{service.title}</h3>
                <ul class="repair-list">
                  {#each service.items as item}
                    <li>{item}</li>
                  {/each}
                </ul>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="card bg-base-100 shadow-md mt-8">
          <div class="card-body p-6">
            <h3 class="card-title">Additional Services</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div class="text-center p-4 bg-gray-50 rounded-lg">Brake Service</div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">Suspension</div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">A/C Repair</div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">Tune-Ups</div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">Oil Changes</div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">Wheel Alignment</div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">Tire Service</div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">Exhaust</div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Scheduling Details Tab -->
    {#if activeTab === 'scheduling'}
      <div class="mx-auto w-full brand-container">
        <div class="centered-grid-container">
          <div>
            <div class="card bg-base-100 shadow-md mb-8">
              <div class="card-body p-6">
                <h3 class="card-title mb-4">How to Schedule Service</h3>
                <ul class="repair-list">
                  {#each schedulingInfo.howTo as item}
                    <li>{item}</li>
                  {/each}
                </ul>
              </div>
            </div>
            
            <div class="card bg-base-100 shadow-md">
              <div class="card-body p-6">
                <h3 class="card-title mb-4">Our Policies</h3>
                <ul class="repair-list">
                  {#each schedulingInfo.policies as policy}
                    <li>{policy}</li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <div class="card bg-base-100 shadow-md">
              <div class="card-body p-6">
                <h3 class="card-title mb-4">Typical Lead Times</h3>
                <table class="schedule-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Estimated Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each schedulingInfo.leadTimes as { service, time }}
                      <tr>
                        <td>{service}</td>
                        <td>{time}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
                
                <div class="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p class="font-semibold mb-2">Note:</p>
                  <p>All time estimates are subject to change based on parts availability and current shop workload. 
                     We will provide you with an updated timeline when you schedule your service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Automotive Brand Tab -->
    {#if activeTab === 'brand'}
      <div class="mx-auto w-full brand-container">
        <div class="centered-grid-container">
          <div>
            <div class="card bg-base-100 shadow-md">
              <div class="card-body p-6">
                <h3 class="card-title mb-4">European Specialty</h3>
                <p class="mb-6">While we service all makes and models, our technicians have specialized training and experience with these European brands:</p>
                
                <div class="flex flex-wrap gap-2 mb-4 justify-center">
                  {#each brandInfo.specialized as brand}
                    <div class="brand-pill font-medium">{brand}</div>
                  {/each}
                </div>
                
                <div class="mt-6">
                  <h4 class="text-lg font-medium mb-3">We Also Service</h4>
                  <ul class="repair-list">
                    {#each brandInfo.allMakes as make}
                      <li>{make}</li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div class="card bg-base-100 shadow-md">
              <div class="card-body p-6">
                <h3 class="card-title mb-4">Parts & Components</h3>
                <p class="mb-6">We source only the highest quality parts for your vehicle, focusing on reliability, performance, and longevity.</p>
                
                <ul class="repair-list">
                  {#each brandInfo.parts as part}
                    <li>{part}</li>
                  {/each}
                </ul>
              </div>
            </div>
            
            <div class="card bg-base-100 shadow-md mt-8">
              <div class="card-body p-6">
                <h3 class="card-title mb-4">Performance Upgrades</h3>
                <p>We offer a range of performance enhancements from mild to wild, all while maintaining reliability. Ask about our upgrade packages for your specific vehicle.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- What We Offer Section -->
  <div class="full-width-center">
    <h2 class="section-title">What We Offer</h2>
  </div>
  <div class="offerings-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 section-spacer">
    {#each offerings as offering}
      <div class="offering-item">
        <div class="offering-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 class="text-base font-medium">{offering.title}</h3>
        <p class="offering-description">{offering.description}</p>
      </div>
    {/each}
  </div>
  
  <!-- Our Services Section -->
  <div class="full-width-center">
    <h2 class="section-title">Our Services</h2>
  </div>
  <p class="text-center mb-8">
    At Scotia Performance, we're committed to providing reliable, honest, and high-quality automotive services.
  </p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 section-spacer">
    {#each services as service}
      <div class="card bg-base-100 shadow-md service-card">
        <div class="card-body p-8 items-center text-center">
          <div class="icon-container text-primary mb-4">
            {@html service.icon}
          </div>
          <h3 class="card-title mb-3">{service.title}</h3>
          <p class="text-sm">{service.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div> 