# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Erstellen

Um eine Produktionsversion Ihrer App zu erstellen:

```bash
npm run build
```

Sie können die Produktions-Build mit `npm run preview` vorab ansehen.

## Lambda

Installieren Sie Cargo Lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Click-Ops:
 - CORS zur Funktions-URL hinzufügen
 - Content-Type-Header zulassen
 - Lambda-Funktion den Zugriff auf DynamoDB erlauben

## Frontend

Wechseln Sie in das Frontend-Verzeichnis.
Führen Sie `vercel --prod` aus.

## TODO
- Überwachung der Lambda-Funktionsnutzung
- Hinzufügen eines echten Empfehlungscode-Mechanismus
- Randomisieren-Button für Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa usw. hinzuzufügen.
- Bestelllimit pro E-Mail?
- Frontend verschönern
