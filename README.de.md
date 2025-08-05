# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die Anwendung in einem neuen Browser-Tab
npm run dev -- --open
```

## Bauen

Um eine Produktionsversion Ihrer App zu erstellen:

```bash
npm run build
```

Sie können den Produktions-Build mit `npm run preview` in der Vorschau anzeigen.

## Lambda

Installieren Sie Cargo Lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

`cargo lambda build --arm64 --release`
`cargo lambda deploy --enable-function-url mayournaise --profile personal`


Funktions-URL: `https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/`

Klick-Operationen:
 - Fügen Sie CORS zur Funktions-URL hinzu
 - Erlauben Sie den Content-Type-Header
 - Erlauben Sie der Lambda-Funktion, DynamoDB zu verwenden


## Frontend

Wechseln Sie in das Frontend-Verzeichnis (`cd frontend`)
Führen Sie `vercel --prod` aus

## TODO
- Überwachung der Lambda-Funktionsnutzung
- Einen echten Empfehlungscode-Mechanismus hinzufügen
- Zufällige Auswahl-Taste für Optionen
- Die Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa usw. hinzuzufügen.
- Pro-E-Mail-Limit für Bestellungen?
- Frontend verschönern
