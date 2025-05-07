# Mayournaise

## Sviluppo

Dopo aver creato un progetto e installato le dipendenze con `npm install` (o `pnpm install` o `yarn`), avvia un server di sviluppo:

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

Puoi visualizzare l'anteprima della build di produzione con `npm run preview`.

## Lambda

Installa cargo lambda con `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


URL della funzione: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operazioni di configurazione:
 - aggiungere CORS all'URL della funzione
 - consentire l'header content-type
 - consentire alla funzione Lambda di interagire con DynamoDB


## Frontend

Entra nella directory frontend
Esegui `vercel --prod`

## Da fare
- monitoraggio per l'utilizzo delle funzioni Lambda
- aggiungere un meccanismo reale di codice di riferimento
- pulsante di randomizzazione per le opzioni
- aggiungere la possibilità di inserire extra come aglio, affumicato, harissa, ecc.
- limite per email sugli ordini?
- rendere il frontend più gradevole