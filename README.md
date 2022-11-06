# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Lambda

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


function url: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

click ops:
 - add cors to function url
 - allow content-type header
 - allow lambda function to touch dynamodb


## TODO
- make frontend pretty
- low stock indicators?
- monitoring for Lambda function usage
- randomise button for options
- update/change favicon
- deploy frontend somewhere
- add disclaimers for taste & delivery & payment, etc.
- allow ingredients to be requested to be added to options?
- add ability to add extras like garlic, smoke, harissa, etc.
- update README
- order confirmation on frontend?
- per-email limit on ordering?
- grey-out or mark as sold out if stock is 0 on frontend