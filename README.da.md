# Mayournaise

## Udvikling

Når du har oprettet et projekt og installeret afhængigheder med `npm install` (eller `pnpm install` eller `yarn`), kan du starte en udviklingsserver:

```bash
npm run dev

# eller start serveren og åbn appen i en ny browser-fane
npm run dev -- --open
```

## Bygning

For at oprette en produktionsversion af din app:

```bash
npm run build
```

Du kan forhåndsvise produktionsbygningen med `npm run preview`.

## Lambda

Installer cargo lambda med `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Klik operationer:
 - tilføj CORS til funktions-URL
 - tillad content-type header
 - tillad lambda-funktionen at tilgå dynamodb


## Frontend

Skift til frontend-mappen
Kør `vercel --prod`

## TODO
- overvågning af Lambda-funktionsbrug
- tilføj en rigtig henvisningskode-mekanisme
- randomiser-knap til valgmuligheder
- tilføj mulighed for at tilføje ekstrating som hvidløg, røg, harissa osv.
- grænse for bestilling per e-mail?
- gør frontend pænt