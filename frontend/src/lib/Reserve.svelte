<script>
  import { onMount } from "svelte";
  import { getInventory, submitOrder } from "./api";
  import InventorySelector from "./InventorySelector.svelte";

  let oil, egg, acid, mustard, emailAddress;
  let buttonDisabled = false;
  let buttonText = "Reserve!";
  let notification = "";
  let inventory;

  onMount(async () => {
    try {
      inventory = await getInventory();
    } catch (error) {
      notification = "Could not load inventory. Please try again later.";
    }
  });

  const submitForm = async () => {
    buttonDisabled = true;

    try {
      await submitOrder({
        oil,
        egg,
        acid,
        mustard,
        emailAddress,
      });

      buttonText = "Submitted!";
    } catch (error) {
      buttonDisabled = false;
      notification = "Something went wrong - try a different combination?";
    }
  };
</script>

<!-- maybe shuffle this title between some options -->
<h1>Reserve your Mayournaise</h1>
<p>A silly project by Sudhir</p>

{#if inventory}
  <InventorySelector
    title="Choose an oil"
    items={inventory.oil}
    bind:selected={oil}
  />
  <InventorySelector
    title="Choose an egg"
    items={inventory.egg}
    bind:selected={egg}
  />
  <InventorySelector
    title="Choose an acid"
    items={inventory.acid}
    bind:selected={acid}
  />
  <InventorySelector
    title="Choose a mustard"
    items={inventory.mustard}
    bind:selected={mustard}
  />

  <div class="form-group">
    <label for="email">Email address:</label>
    <input
      type="email"
      id="email"
      name="email"
      bind:value={emailAddress}
      placeholder="p.s. you don't have to enter an actual email"
    />
  </div>

  <b>WARNINGS</b>
  <br />
  I hold no responsibility for the resulting taste of any combination
  <br />
  For legal reasons, this isn't a food business
  <br />
  If I don't know you, you're unlikely to receive any mayo (sorry)
  <br />
  <br />

  <div class="form-group">
    <button
      class="submit-button"
      on:click={submitForm}
      disabled={buttonDisabled}
    >
      {buttonText}
    </button>
  </div>

  {#if notification}
    <div class="notification">{notification}</div>
  {/if}
{:else}
  <p class="loading">loading...</p>
{/if}

<style>
  .form-group {
    margin-bottom: 1rem;
  }

  input[type="email"] {
    width: 100%;
    padding: 12px;
    margin: 16px 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    font-size: 16px;
    color: #333;
    transition:
      border-color 0.3s,
      box-shadow 0.3s;
  }

  input[type="email"]:focus {
    border-color: #5b9ddf; /* Highlight color when focused */
    box-shadow: 0 2px 8px rgba(91, 157, 223, 0.5); /* Stronger box shadow for focus */
    outline: none; /* Remove default focus outline */
  }

  input[type="email"]:hover {
    border-color: #5b9ddf; /* Highlight color when hovered */
  }

  .submit-button {
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .submit-button:hover {
    background-color: #45a049;
  }

  .submit-button:disabled {
    background-color: #ccc;
    cursor: default;
  }

  .notification {
    color: red;
    margin-top: 1rem;
  }
</style>
