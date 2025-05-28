<script lang="ts">
  // Reviews data - similar to services array pattern
  const reviews = [
    {
      stars: "★★★★★",
      text: "Professional respectable operation run at peak productivity. Amazingly service. Honest. A garage with morals to not rip you off.",
      reviewer: "Oak Owl"
    },
    {
      stars: "★★★★★",
      text: "Great place, they're fast, reliable, honest, and professional. They never try to sell you on things you don't need and they always do quality work.",
      reviewer: "Joe H."
    },
    {
      stars: "★★★★★",
      text: "After having recently moved to the area and needing to find a shop for my cars, I am so happy to have found Scotia Performance.",
      reviewer: "Mark R."
    }
  ];
</script>

<section class="reviews" id="reviews">
  <div class="container">
    <h2>What Our Customers Say</h2>
    <div class="reviews-grid">
      {#each reviews as review}
        <div class="review-card">
          <div class="stars">{review.stars}</div>
          <p>"{review.text}"</p>
          <div class="reviewer">- {review.reviewer}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Main Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Reviews Section */
  .reviews {
    padding: 3rem 0;
  }
  
  .reviews h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .review-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .review-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .stars {
    color: #f59e0b;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .reviewer {
    margin-top: 1rem;
    font-style: italic;
    text-align: right;
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .review-card {
      transition: none;
    }
    
    .review-card:hover {
      transform: none;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .reviews-grid {
      grid-template-columns: 1fr;
    }
    
    .reviews {
      padding: 2rem 0;
    }
    
    .reviews h2 {
      font-size: 1.75rem;
    }
  }
</style> 