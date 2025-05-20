# Mayournaise

## Ontwikkelen

Zodra je een project hebt aangemaakt en de afhankelijkheden hebt geïnstalleerd met `npm install` (of `pnpm install` of `yarn`), start je een ontwikkelserver:

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

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

Functie URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Klik-operaties:
 - CORS toevoegen aan functie-URL
 - `content-type` header toestaan
 - Lambda-functie toestemming geven om DynamoDB te gebruiken

## Frontend

Ga naar de `frontend` map.
Voer `vercel --prod` uit.

## TODO
- Monitoring voor Lambda-functiegebruik
- Een echt mechanisme voor verwijzingscodes toevoegen
- Randomiseerknop voor opties
- Mogelijkheid toevoegen om extra's zoals knoflook, rook, harissa, enz. toe te voegen
- Limiet per e-mailadres voor bestellingen?
- Frontend mooier maken
