# Mayournaise

## Ontwikkelen

Nadat je een project hebt gemaakt en afhankelijkheden hebt geïnstalleerd met `npm install` (of `pnpm install` of `yarn`), start je een ontwikkelserver:

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

```
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

Functie-URL: `https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/`

Handmatige stappen:
- Voeg CORS toe aan de functie-URL
- Sta `content-type` header toe
- Sta de Lambda-functie toe om DynamoDB te benaderen

## Frontend

Ga naar de frontend-map:
`cd frontend`
Voer `vercel --prod` uit

## TODO
- Monitoring voor Lambda-functiegebruik
- Voeg een echt verwijzingscodemechanisme toe
- Randomiseerknop voor opties
- Voeg de mogelijkheid toe om extra's toe te voegen zoals knoflook, rook, harissa, enz.
- Limiet per e-mail voor bestellingen?
- Maak de frontend mooi
