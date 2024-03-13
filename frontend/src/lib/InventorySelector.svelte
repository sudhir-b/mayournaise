<script>
  export let title = "";
  export let items = [];
  export let selected = "";
</script>

<label>
  {title}:
  <select bind:value={selected}>
    {#each items as item}
      <option value={item.name} disabled={item.stock === 0}>
        {item.name}
      </option>
    {/each}
  </select>
</label>

<style>
  select {
    padding: 12px;
    margin: 16px 0;
    border: 1px solid #ddd; /* Lighter border */
    border-radius: 6px; /* Rounded borders */
    background-color: #fff; /* White background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft box shadow */
    font-size: 16px; /* Larger font size */
    color: #333; /* Dark grey color for text */
    transition:
      border-color 0.3s,
      box-shadow 0.3s; /* Smooth transition for hover effects */
  }

  select:focus {
    border-color: #5b9ddf; /* Highlight color when focused */
    box-shadow: 0 2px 8px rgba(91, 157, 223, 0.5); /* Stronger box shadow for focus */
    outline: none; /* Remove default focus outline */
  }

  select:hover {
    border-color: #5b9ddf; /* Highlight color when hovered */
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 18px; /* Larger label font size */
    color: #333; /* Dark grey color for label */
    font-weight: 500; /* Medium font weight for the label */
  }

  /* Optional: Style for disabled options */
  option:disabled {
    color: #ccc; /* Light grey color indicating disabled */
  }
</style>
