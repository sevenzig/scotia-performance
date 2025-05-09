<script lang="ts">
  const { businessHours = [] } = $props<{
    businessHours?: { day: string; hours: string }[];
  }>();
</script>

<div class="card bg-base-100 shadow-md h-full">
  <div class="card-body p-4">
    <h2 class="card-title text-lg mb-2">Business Hours</h2>
    
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-sm">
        <tbody>
          {#each businessHours as { day, hours }}
            <tr>
              <td class="font-medium">{day}</td>
              <td class="text-right">{hours}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div> 