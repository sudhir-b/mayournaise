# Maionese Personalizzata

## Sviluppo

Una volta creato il progetto e installate le dipendenze con `npm install` (o `pnpm install` o `yarn`), avvia un server di sviluppo:

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

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL della funzione: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operazioni manuali (click ops):
 - aggiungi CORS all'URL della funzione
 - permetti l'header content-type
 - permetti alla funzione Lambda di accedere a DynamoDB

## Frontend

Entra nella cartella `frontend`
Esegui `vercel --prod`

## DA FARE
- monitoraggio dell'uso della funzione Lambda
- aggiungere un vero meccanismo di codice referral
- pulsante per randomizzare le opzioni
- aggiungere la possibilità di aggiungere extra come aglio, affumicatura, harissa, ecc.
- limite di ordini per email?
- rendere il frontend più carino
