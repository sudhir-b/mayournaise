<script>
  const PUBLIC_API_URL =
    "https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws";

  let oil;
  let egg;
  let acid;
  let mustard;
  let email_address;

  const submitForm = async () => {
    const buyUrl = `${PUBLIC_API_URL}/order`;
    console.log(buyUrl);
    const submit = await fetch(buyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oil, egg, acid, mustard, email_address }),
    });

    const data = await submit.json();

    console.log(data);
  };

  let inventory;

  const transform = (data) => {
    let transformed = {};
    for (const item of data.items) {
      if (!transformed[item["item_type"]]) {
        transformed[item["item_type"]] = [];
      }

      transformed[item["item_type"]].push(item["item_name"]);
    }

    return transformed;
  };

  fetch(`${PUBLIC_API_URL}/inventory`)
    .then((r) => r.json())
    .then((data) => {
      inventory = transform(data);
      console.log(inventory);
    });
</script>

<h1>Welcome to Mayournaise</h1>
<p>A silly project by Sudhir</p>

<br />

{#if inventory}
  <form on:submit|preventDefault={submitForm}>
    <label
      >Choose an oil:
      <select name="oil" id="oil" bind:value={oil}>
        {#each inventory.oil as oil}
          <option value={oil}>{oil}</option>
        {/each}
      </select>
    </label>

    <br />
    <br />

    <label
      >Choose egg:
      <select name="egg" id="egg" bind:value={egg}>
        {#each inventory.egg as egg}
          <option value={egg}>{egg}</option>
        {/each}
      </select>
    </label>

    <br />
    <br />

    <label
      >Choose an acid:
      <select name="acid" id="acid" bind:value={acid}>
        {#each inventory.acid as acid}
          <option value={acid}>{acid}</option>
        {/each}
      </select>
    </label>
    <br />
    <br />

    <label
      >Choose a mustard:
      <select name="mustard" id="mustard" bind:value={mustard}>
        {#each inventory.mustard as mustard}
          <option value={mustard}>{mustard}</option>
        {/each}
      </select>
    </label>

    <br />
    <br />

    <label
      >Email address:
      <input type="text" id="email" name="email" bind:value={email_address} />
    </label>

    <br />
    <br />

    <button>Reserve!</button>
  </form>
{:else}
  <p class="loading">loading...</p>
{/if}
