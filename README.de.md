# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Erstellung (Build)

Um eine Produktionsversion Ihrer App zu erstellen:

```bash
npm run build
```

Sie können den Produktions-Build mit `npm run preview` in der Vorschau anzeigen.

## Lambda

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

Funktions-URL: `https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/`

Manuelle Schritte (Click Ops):
- CORS zur Funktions-URL hinzufügen
- `Content-Type`-Header zulassen
- Lambda-Funktion den Zugriff auf DynamoDB erlauben

## Frontend

Wechseln Sie in das Frontend-Verzeichnis (`cd frontend`)
Führen Sie `vercel --prod` aus

## TODO
- Monitoring für die Lambda-Funktionsnutzung
- Einen echten Empfehlungscode-Mechanismus hinzufügen
- Zufallsknopf für Optionen hinzufügen
- Die Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa usw. hinzuzufügen.
- Eine E-Mail-spezifische Bestellbegrenzung?
- Frontend verschönern
