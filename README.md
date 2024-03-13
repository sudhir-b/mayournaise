# Mayournaise

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

## Lambda

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


function url: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

click ops:
 - add cors to function url
 - allow content-type header
 - allow lambda function to touch dynamodb


## Frontend

cd into frontend
run `vercel --prod`

## TODO
- monitoring for Lambda function usage
- add a real referral code mechanism
- randomise button for options
- add ability to add extras like garlic, smoke, harissa, etc.
- per-email limit on ordering?
- make frontend pretty
