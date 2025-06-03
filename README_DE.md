# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und die Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

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

Sie können den Produktions-Build mit `npm run preview` in der Vorschau anzeigen.

## Lambda

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


Function-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Click-Ops:
 - CORS zur Function-URL hinzufügen
 - Content-Type-Header erlauben
 - Lambda-Funktion Zugriff auf DynamoDB gewähren


## Frontend

Wechseln Sie in das Frontend-Verzeichnis
Führen Sie `vercel --prod` aus

## TODO
- Monitoring für Lambda-Funktion-Nutzung
- einen echten Empfehlungscode-Mechanismus hinzufügen
- Zufalls-Button für Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa, etc. hinzuzufügen
- Pro-E-Mail-Limit für Bestellungen?
- Frontend schöner gestalten