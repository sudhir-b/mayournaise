# Mayournaise

## Ontwikkelen

Nadat je een project hebt aangemaakt en dependencies hebt geïnstalleerd met `npm install` (of `pnpm install` of `yarn`), start een ontwikkelingsserver:

```bash
npm run dev

# of start de server en open de app in een nieuw browsertabblad
npm run dev -- --open
```

## Bouwen

Om een productieversie van je app te maken:

```bash
npm run build
```

Je kunt de productiebuild bekijken met `npm run preview`.

## Lambda

Installeer cargo lambda met `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


functie url: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

handmatige stappen:
 - voeg cors toe aan functie url
 - sta content-type header toe
 - geef lambda functie toegang tot dynamodb


## Frontend

ga naar de frontend directory
voer `vercel --prod` uit

## TODO
- monitoring voor Lambda functiegebruik
- voeg een echt verwijzingscode mechanisme toe
- randomiseerknop voor opties
- mogelijkheid toevoegen om extra's zoals knoflook, rook, harissa, etc. toe te voegen
- limiet per e-mail voor bestellingen?
- maak frontend mooier