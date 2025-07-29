# Mayournaise

## Sviluppo

Una volta creato il progetto e installato le dipendenze con `npm install` (o `pnpm install` o `yarn`), avvia un server di sviluppo:

```bash
npm run dev

# oppure avvia il server e apri l'app in una nuova scheda del browser
npm run dev -- --open
```

## Build

Per creare una versione di produzione della tua app:

```bash
npm run build
```

Puoi visualizzare in anteprima la build di produzione con `npm run preview`.

## Lambda

Installa cargo lambda con `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


url della funzione: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

operazioni manuali:
 - aggiungere cors all'url della funzione
 - permettere l'header content-type
 - permettere alla funzione lambda di accedere a dynamodb


## Frontend

vai nella cartella frontend
esegui `vercel --prod`

## DA FARE
- monitoraggio per l'utilizzo della funzione Lambda
- aggiungere un meccanismo di codice referral reale
- pulsante randomizzatore per le opzioni
- aggiungere la possibilità di aggiungere extra come aglio, affumicato, harissa, ecc.
- limite per email per gli ordini?
- rendere il frontend più bello
