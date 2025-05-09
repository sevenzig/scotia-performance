<script lang="ts">
  // Testimonials data using Svelte 5 runes syntax
  const testimonials = $state([
    {
      id: 1,
      text: "I have complete trust in Scotia Performance. I always leave my car knowing it will be well taken care of and that I will be treated fairly. A+ rating all around!",
      author: "Local Customer",
      rating: 5
    },
    {
      id: 2,
      text: "Professional and respectable operation with amazing service and honesty. I appreciate the garage's morals and commitment to never overcharge customers. They truly have integrity.",
      author: "Satisfied Client",
      rating: 5
    },
    {
      id: 3,
      text: "Scotia Performance has consistently provided reliable and high-quality repairs for my vehicles. Their dedication to ethical practices and customer satisfaction is unmatched in the area.",
      author: "Long-time Customer",
      rating: 5
    }
  ]);

  // Current testimonial index
  let currentIndex = $state(0);
  
  // Navigation functions
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }
  
  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  }
  
  // Stars display for rating
  function getStars(rating: number) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
</script>

<section class="testimonials-section">
  <div class="testimonials-card">
    <div class="testimonials-body">
      <h2 class="testimonials-title">What Our Customers Say</h2>

      <div class="carousel">
        <div class="carousel-item">
          <div class="testimonial-content">
            <div class="quote-mark">"</div>
            <p class="quote-text">{testimonials[currentIndex].text}</p>
            <div class="quote-mark">"</div>
            
            <div class="divider"></div>
            
            <div class="rating">
              {getStars(testimonials[currentIndex].rating)}
            </div>
            <p class="author">{testimonials[currentIndex].author}</p>
          </div>
          
          <div class="navigation-buttons">
            <button class="nav-button" onclick={prevTestimonial}>❮</button>
            <button class="nav-button" onclick={nextTestimonial}>❯</button>
          </div>
        </div>
      </div>

      <div class="pagination">
        {#each testimonials as testimonial, index}
          <button 
            class="pagination-dot {index === currentIndex ? 'active' : ''}" 
            onclick={() => currentIndex = index}
          >
            {index + 1}
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .testimonials-section {
    padding: 2.5rem 0;
    margin-bottom: 2rem;
  }
  
  .testimonials-card {
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .testimonials-body {
    padding: 1.5rem;
  }
  
  .testimonials-title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .carousel {
    width: 100%;
  }
  
  .carousel-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    padding: 1rem;
  }
  
  .testimonial-content {
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .quote-mark {
    font-size: 1.875rem;
    color: #1A5DAD;
    margin-bottom: 1rem;
    font-family: serif;
  }
  
  .quote-text {
    font-size: 1.125rem;
    font-style: italic;
    margin-bottom: 1rem;
  }
  
  .divider {
    height: 1px;
    background-color: #e2e8f0;
    max-width: 10rem;
    margin: 1rem auto;
  }
  
  .rating {
    color: #f59e0b;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .author {
    font-weight: 600;
  }
  
  .navigation-buttons {
    position: absolute;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    left: 0.5rem;
    right: 0.5rem;
    top: 50%;
  }
  
  .nav-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .nav-button:hover {
    background-color: #f8fafc;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .pagination-dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    font-size: 0.75rem;
  }
  
  .pagination-dot.active {
    background-color: #1A5DAD;
    color: white;
    border-color: #1A5DAD;
  }
</style> 