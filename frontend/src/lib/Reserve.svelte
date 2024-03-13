<script>
  import { onMount } from "svelte";
  import { getInventory, submitOrder } from "./api"; // Separate API calls into a module
  import InventorySelector from "./InventorySelector.svelte"; // Component for each selector

  let oil, egg, acid, mustard, emailAddress;
  let buttonDisabled = false;
  let buttonText = "Reserve!";
  let notification = "";
  let inventory;

  onMount(async () => {
    try {
      const data = await getInventory();
      inventory = transform(data);
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

  onMount(async () => {
    try {
      const data = await getInventory();
      inventory = transform(data);
    } catch (error) {
      notification = "Could not load inventory. Please try again later.";
    }
  });

  const transform = (data) => {
    let transformed = {};
    for (const item of data.items) {
      if (!transformed[item["item_type"]]) {
        transformed[item["item_type"]] = [];
      }

      let name = item["item_name"];
      if (item["stock"] === 0) {
        name = `${item["item_name"]} - sold out`;
      }

      transformed[item["item_type"]].push({
        name: name,
        stock: item["stock"],
      });
    }

    const keys = Object.keys(transformed);
    for (const key of keys) {
      transformed[key].sort(function (a, b) {
        return b.stock - a.stock;
      });
    }

    return transformed;
  };
</script>

<h1>Mayournaise</h1>
<p>Mayo for YOU from Sudhir</p>

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
    padding: 10px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
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
