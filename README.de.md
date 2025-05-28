# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Build

Um eine Produktionsversion Ihrer App zu erstellen:

```bash
npm run build
```

Sie können den Produktions-Build mit `npm run preview` anzeigen.

## Lambda

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Click-Ops:
 - CORS zur Funktions-URL hinzufügen
 - content-type Header erlauben
 - Lambda-Funktion den Zugriff auf DynamoDB ermöglichen


## Frontend

Wechseln Sie in das frontend-Verzeichnis
Führen Sie `vercel --prod` aus

## TODO
- Überwachung für Lambda-Funktions-Nutzung
- einen echten Empfehlungscode-Mechanismus hinzufügen
- Zufallsbutton für Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa, etc. hinzuzufügen
- Pro-E-Mail-Limit für Bestellungen?
- Frontend hübscher machen