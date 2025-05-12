# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Building

Um eine Produktionsversion Ihrer App zu erstellen:

```bash
npm run build
```

Sie können den Produktions-Build mit `npm run preview` vorschau-anzeigen.

## Lambda

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Klick-Operationen:
 - CORS zur Funktions-URL hinzufügen
 - Content-Type-Header erlauben
 - Lambda-Funktion erlauben, auf DynamoDB zuzugreifen

## Frontend

Wechseln Sie in das Frontend-Verzeichnis
Führen Sie `vercel --prod` aus

## TODO
- Überwachung der Lambda-Funktionsnutzung
- Einen echten Empfehlungscode-Mechanismus hinzufügen
- Button zum zufälligen Auswählen von Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa usw. hinzuzufügen.
- Limit pro E-Mail für Bestellungen?
- Frontend verschönern
