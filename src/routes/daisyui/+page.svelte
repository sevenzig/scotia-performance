<script lang="ts">
  // This is a test page to verify DaisyUI components
  import { onMount } from 'svelte';
  
  let currentTheme = $state('scotia');
  
  function changeTheme(theme: string) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  onMount(() => {
    // Set the initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">DaisyUI Components Test</h1>
  
  <div class="mb-4">
    <h2 class="font-bold mb-2">Theme Selection</h2>
    <div class="flex gap-2">
      <button class="btn btn-sm" class:btn-primary={currentTheme === 'scotia'} onclick={() => changeTheme('scotia')}>Scotia</button>
      <button class="btn btn-sm" class:btn-primary={currentTheme === 'light'} onclick={() => changeTheme('light')}>Light</button>
      <button class="btn btn-sm" class:btn-primary={currentTheme === 'dark'} onclick={() => changeTheme('dark')}>Dark</button>
    </div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border p-4 rounded-lg shadow">
      <h2 class="font-bold mb-2">Buttons</h2>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <button class="btn">Default</button>
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
        <button class="btn btn-info">Info</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-warning">Warning</button>
        <button class="btn btn-error">Error</button>
      </div>

      <div class="flex flex-wrap gap-2">
        <button class="btn btn-outline">Outline</button>
        <button class="btn btn-primary btn-outline">Primary</button>
        <button class="btn btn-secondary btn-outline">Secondary</button>
      </div>
    </div>
    
    <div class="border p-4 rounded-lg shadow">
      <h2 class="font-bold mb-2">Cards</h2>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Card Title</h2>
          <p>This is a simple card component from DaisyUI.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Action</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="border p-4 rounded-lg shadow">
      <h2 class="font-bold mb-2">Alert</h2>
      
      <div class="alert mb-2">
        <span>Default Alert</span>
      </div>
      
      <div class="alert alert-info mb-2">
        <span>Info Alert</span>
      </div>
      
      <div class="alert alert-success mb-2">
        <span>Success Alert</span>
      </div>
      
      <div class="alert alert-warning mb-2">
        <span>Warning Alert</span>
      </div>
      
      <div class="alert alert-error">
        <span>Error Alert</span>
      </div>
    </div>
    
    <div class="border p-4 rounded-lg shadow">
      <h2 class="font-bold mb-2">Form Elements</h2>
      
      <div class="form-control mb-4">
        <label class="label">
          <span class="label-text">Text Input</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered" />
      </div>
      
      <div class="form-control mb-4">
        <label class="label">
          <span class="label-text">Select</span>
        </label>
        <select class="select select-bordered">
          <option disabled selected>Pick one</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Checkbox</span>
          <input type="checkbox" class="checkbox" />
        </label>
      </div>
    </div>
  </div>
  
  <div class="mt-8">
    <div class="tabs tabs-boxed">
      <a href="/services" class="tab tab-active">Tab 1</a>
      <a href="/maintenance" class="tab">Tab 2</a>
      <a href="/" class="tab">Tab 3</a>
    </div>
  </div>
</div> 