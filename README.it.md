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

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL della funzione: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operazioni manuali (click ops):
 - aggiungi CORS all'URL della funzione
 - consenti l'header content-type
 - consenti alla funzione Lambda di accedere a DynamoDB


## Frontend

Entra nella cartella `frontend`
Esegui `vercel --prod`

## TODO
- monitoraggio dell'utilizzo della funzione Lambda
- aggiungi un vero meccanismo di codice di riferimento
- pulsante per randomizzare le opzioni
- aggiungi la possibilità di aggiungere extra come aglio, fumo, harissa, ecc.
- limite di ordini per email?
- rendi il frontend carino
