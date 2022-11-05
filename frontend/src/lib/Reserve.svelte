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
</script>

<h1>Welcome to Mayournaise</h1>
<p>A silly project by Sudhir</p>

<br />

<form on:submit|preventDefault={submitForm}>
  <label
    >Choose an oil:
    <select name="oil" id="oil" bind:value={oil}>
      <option value="sunflower">Sunflower</option>
      <option value="olive">Olive</option>
    </select>
  </label>

  <br />
  <br />

  <label
    >Choose egg:
    <select name="egg" id="egg" bind:value={egg}>
      <option value="chicken">Chicken</option>
      <option value="duck">Duck</option>
    </select>
  </label>

  <br />
  <br />

  <label
    >Choose an acid:
    <select name="acid" id="acid" bind:value={acid}>
      <option value="lemon_juice">Lemon juice</option>
      <option value="white_vinegar">White vinegar</option>
    </select>
  </label>
  <br />
  <br />

  <label
    >Choose a mustard:
    <select name="mustard" id="mustard" bind:value={mustard}>
      <option value="dijon">Dijon</option>
      <option value="wholegrain">Whole grain</option>
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
