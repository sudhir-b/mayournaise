# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und die Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Build erstellen

Um eine Produktionsversion Ihrer App zu erstellen:

```bash
npm run build
```

Sie können den Produktions-Build mit `npm run preview` vorschau anzeigen.

## Lambda

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Click Ops:
 - CORS zur Funktions-URL hinzufügen
 - Content-Type Header erlauben
 - Lambda-Funktion den Zugriff auf DynamoDB ermöglichen

## Frontend

Wechseln Sie in das Frontend-Verzeichnis
Führen Sie `vercel --prod` aus

## TODO
- Monitoring für Lambda-Funktionsnutzung
- echten Empfehlungscode-Mechanismus hinzufügen
- Zufallsauswahl-Button für Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa usw. zu ergänzen
- E-Mail-bezogenes Bestelllimit?
- Frontend hübscher gestalten