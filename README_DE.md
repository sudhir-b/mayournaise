# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und die Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Erstellen

Um eine Produktionsversion Ihrer App zu erstellen:

```bash
npm run build
```

Sie können die Produktionsversion mit `npm run preview` in der Vorschau ansehen.

## Lambda

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


function url: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

click ops:
 - add cors to function url
 - allow content-type header
 - allow lambda function to touch dynamodb


## Frontend

Wechseln Sie in das Frontend-Verzeichnis
Führen Sie `vercel --prod` aus

## AUFGABEN
- Überwachung für Lambda-Funktionsnutzung
- einen echten Empfehlungscode-Mechanismus hinzufügen
- Zufalls-Button für Optionen
- Möglichkeit zum Hinzufügen von Extras wie Knoblauch, Rauch, Harissa usw.
- E-Mail-basiertes Bestelllimit?
- Frontend schöner gestalten
