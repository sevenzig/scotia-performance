<script lang="ts">
  const {
    quote,
    author = "Customer",
    rating = 5,
    readMoreLink
  } = $props<{
    quote: string;
    author?: string; 
    rating?: number;
    readMoreLink?: string;
  }>();
  
  // Generate stars based on rating
  const stars = $derived("★".repeat(rating) + "☆".repeat(5 - rating));
</script>

<section class="testimonial-section">
  <div class="testimonial-card">
    <div class="testimonial-body">
      <h2 class="testimonial-title">What Our Customers Say</h2>

      <div class="testimonial-content">
        <div class="quote-mark">"</div>
        <p class="quote-text">{quote}</p>
        <div class="quote-mark">"</div>
        
        <div class="divider"></div>
        
        <div class="rating">
          {stars}
        </div>
        <p class="author">{author}</p>
      </div>

      {#if readMoreLink}
        <div class="read-more">
          <p>Read more reviews on <a href={readMoreLink} target="_blank" rel="noopener noreferrer" class="read-more-link">Google Maps</a></p>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .testimonial-section {
    padding: 2.5rem 0;
    margin-bottom: 2rem;
  }
  
  .testimonial-card {
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .testimonial-body {
    padding: 1.5rem;
  }
  
  .testimonial-title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .testimonial-content {
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 1.5rem 1rem;
    background-color: #f8fafc;
    border-radius: 0.5rem;
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
  
  .read-more {
    text-align: center;
    margin-top: 1rem;
  }
  
  .read-more-link {
    color: #1A5DAD;
    text-decoration: underline;
  }
</style> 