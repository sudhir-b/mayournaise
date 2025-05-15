# Mayournaise

## Entwickeln

Sobald Sie ein Projekt erstellt und Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Erstellen

So erstellen Sie eine Produktionsversion Ihrer App:

```bash
npm run build
```

Sie können den Produktions-Build mit `npm run preview` in der Vorschau anzeigen.

## Lambda

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Klick-Operationen:
 - CORS zur Funktions-URL hinzufügen
 - Content-Type-Header zulassen
 - Lambda-Funktion erlauben, DynamoDB zu berühren


## Frontend

Wechseln Sie in das Frontend-Verzeichnis
Führen Sie `vercel --prod` aus

## TODO
- Überwachung der Lambda-Funktionsnutzung
- Echten Empfehlungscode-Mechanismus hinzufügen
- Randomisierungsschaltfläche für Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa usw. hinzuzufügen.
- Bestelllimit pro E-Mail?
- Frontend verschönern
