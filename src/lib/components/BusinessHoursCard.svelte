<script lang="ts">
  const { businessHours = [] } = $props<{
    businessHours?: { day: string; hours: string }[];
  }>();
</script>

<style>
  .business-hours {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    table-layout: fixed;
  }

  .business-hours tr td {
    padding: 0.75rem;
    border-radius: 0.25rem;
    white-space: nowrap;
  }

  .business-hours tr:nth-child(odd) td {
    background-color: var(--scotia-gray-light, #f5f5f5);
  }

  .business-hours .day-column {
    width: 130px;
    font-weight: 500;
  }

  .business-hours .hours-column {
    width: 200px;
  }

  .hours-wrapper {
    width: 100%;
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

<div class="card bg-base-100 shadow-md h-full">
  <div class="card-body p-4">
    <h2 class="card-title text-lg mb-2" style="border: none; border-bottom: none; text-decoration: none; box-shadow: none;">Business Hours</h2>
    
    <div class="hours-wrapper">
      <table class="business-hours">
        <tbody>
          {#each businessHours as { day, hours }}
            <tr>
              <td class="day-column">{day}</td>
              <td class="hours-column">{hours}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div> 