<script lang="ts">
	import { env } from '$env/dynamic/public';

	let oil: String;
	let egg: String;
	let acid: String;
	let mustard: String;

	const API_URL = env.PUBLIC_API_URL;
	const submitForm = async () => {
		const buyUrl = `${API_URL}/buy`;
		console.log(buyUrl);
		// const submit = await fetch(buyUrl, { method: 'POST', body: JSON.stringify({}) });
	};
</script>

<h1>Welcome to Mayournaise</h1>
<p>A silly project by Sudhir</p>

<br />

<form on:submit={submitForm}>
	<label for="cars">Choose an oil:</label>
	<select name="oil" id="oil" bind:value={oil}>
		<option value="peanut">Peanut</option>
		<option value="sunflower">Sunflower</option>
		<option value="rapeseed">Rapeseed</option>
		<option value="olive">Olive</option>
	</select>

	<br />
	<br />

	<label for="eggs">Choose egg:</label>
	<select name="egg" id="egg" bind:value={egg}>
		<option value="chicken_regular">Chicken (regular)</option>
		<option value="chicken_fancy">Chicken (fancy)</option>
		<option value="duck">Duck</option>
	</select>

	<br />
	<br />

	<label for="acids">Choose an acid:</label>
	<select name="acid" id="acid" bind:value={acid}>
		<option value="lemon_juice">Lemon juice</option>
		<option value="lime_juice">Lime juice</option>
		<option value="white_vinegar">White vinegar</option>
		<option value="malt_vinegar">Malt vinegar</option>
	</select>

	<br />
	<br />

	<label for="mustards">Choose a mustard:</label>
	<select name="mustard" id="mustard" bind:value={mustard}>
		<option value="dijon">Dijon</option>
		<option value="english">English</option>
		<option value="whole_grain">Whole grain</option>
	</select>

	<br />
	<br />

	<button>Buy!</button>
</form>
