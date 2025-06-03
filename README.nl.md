# Mayournaise

## Ontwikkelen

Nadat je een project hebt aangemaakt en de afhankelijkheden hebt geïnstalleerd met `npm install` (of `pnpm install` of `yarn`), start je een ontwikkelingsserver:

```bash
npm run dev

# of start de server en open de app in een nieuw browsertabblad
npm run dev -- --open
```

## Bouwen

Om een productieklare versie van je app te maken:

```bash
npm run build
```

Je kunt de productiebuild previewen met `npm run preview`.

## Lambda

Installeer cargo lambda met `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


functie url: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

klik operaties:
 - voeg CORS toe aan functie-url
 - sta content-type header toe
 - sta lambda-functie toe om dynamodb te gebruiken


## Frontend

cd naar frontend
voer `vercel --prod` uit

## TODO
- monitoring voor Lambda-functiegebruik
- voeg een echt verwijzingscodemechanisme toe
- randomiseerknop voor opties
- voeg mogelijkheid toe om extra's zoals knoflook, rook, harissa, enz. toe te voegen
- limiet per e-mail voor bestellen?
- maak frontend mooi
