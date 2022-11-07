<script>
  const PUBLIC_API_URL =
    "https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws";

  let oil;
  let egg;
  let acid;
  let mustard;
  let email_address;

  let button_disabled = false;
  let button_text = "Reserve!";

  let notification = "";

  const submitForm = async () => {
    button_disabled = true;

    const buyUrl = `${PUBLIC_API_URL}/order`;
    console.log(buyUrl);
    const submitResponse = await fetch(buyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oil, egg, acid, mustard, email_address }),
    });

    if (submitResponse.ok) {
      const data = await submitResponse.json();
      console.log(data);
      button_text = "Submitted!";
    } else {
      button_disabled = false;
      notification = "Something went wrong - try a different combination?"
    }
  };

  let inventory;

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

  fetch(`${PUBLIC_API_URL}/inventory`)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      inventory = transform(data);
      console.log(inventory);
    });
</script>

<h1>Welcome to Mayournaise</h1>
<p>A silly project by Sudhir</p>

<br />

{#if inventory}
  <label
    >Choose an oil:
    <select name="oil" id="oil" bind:value={oil}>
      {#each inventory.oil as oil}
        <option value={oil.name} disabled={oil.stock === 0}>{oil.name}</option>
      {/each}
    </select>
  </label>

  <br />
  <br />

  <label
    >Choose egg:
    <select name="egg" id="egg" bind:value={egg}>
      {#each inventory.egg as egg}
        <option value={egg.name} disabled={egg.stock === 0}>{egg.name}</option>
      {/each}
    </select>
  </label>

  <br />
  <br />

  <label
    >Choose an acid:
    <select name="acid" id="acid" bind:value={acid}>
      {#each inventory.acid as acid}
        <option value={acid.name} disabled={acid.stock === 0}
          >{acid.name}</option
        >
      {/each}
    </select>
  </label>
  <br />
  <br />

  <label
    >Choose a mustard:
    <select name="mustard" id="mustard" bind:value={mustard}>
      {#each inventory.mustard as mustard}
        <option value={mustard.name} disabled={mustard.stock === 0}
          >{mustard.name}</option
        >
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

  <button on:click={submitForm} disabled={button_disabled}>
    {button_text}
  </button>

  <br />
  <br />

  {notification}
{:else}
  <p class="loading">loading...</p>
{/if}
