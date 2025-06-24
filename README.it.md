# Mayournaise

## Sviluppo

Dopo aver creato un progetto e installato le dipendenze con `npm install` (o `pnpm install` o `yarn`), avvia un server di sviluppo:

```bash
npm run dev

# oppure avvia il server e apri l'app in una nuova scheda del browser
npm run dev -- --open
```

## Compilazione

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

operazioni click:
 - aggiungi cors all'URL della funzione
 - consenti l'header content-type
 - consenti alla funzione lambda di accedere a dynamodb


## Frontend

entra nella directory frontend
esegui `vercel --prod`

## DA FARE
- monitoraggio dell'utilizzo della funzione Lambda
- aggiungere un vero meccanismo di codice referral
- pulsante casuale per le opzioni
- aggiungere la possibilità di aggiungere extra come aglio, affumicato, harissa, ecc.
- limite per email sugli ordini?
- rendere il frontend carino