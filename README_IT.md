# Mayournaise 🥪

[🇬🇧 English version](README.md)

## Sviluppo 💻

Una volta creato il progetto e installate le dipendenze con `npm install` (o `pnpm install` o `yarn`), avvia il server di sviluppo:

```bash
npm run dev

# oppure avvia il server e apri l'app in una nuova scheda del browser
npm run dev -- --open
```

## Build 🏗️

Per creare una versione di produzione della tua app:

```bash
npm run build
```

Puoi visualizzare l'anteprima della build di produzione con `npm run preview`.

## Lambda ☁️

Installa cargo lambda con `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


URL della funzione: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

operazioni click ops:
 - aggiungi cors all'URL della funzione
 - consenti header content-type
 - consenti alla funzione lambda di accedere a dynamodb


## Frontend 🎨

entra nella cartella frontend
esegui `vercel --prod`

## TODO 📝
- monitoraggio per l'utilizzo della funzione Lambda
- aggiungere un meccanismo di codice referral reale
- pulsante casuale per le opzioni
- aggiungere la possibilità di aggiungere extra come aglio, fumo, harissa, ecc.
- limite per email sull'ordinazione?
- rendere il frontend più bello