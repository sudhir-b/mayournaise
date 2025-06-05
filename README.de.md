# Mayournaise

## Entwicklung

Nachdem du ein Projekt erstellt und die Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert hast, starte einen Entwicklungsserver:

```bash
npm run dev

# oder starte den Server und öffne die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Bauen (Build)

Um eine Produktionsversion deiner App zu erstellen:

```bash
npm run build
```

Du kannst den Produktions-Build mit `npm run preview` ansehen.

## Lambda

Installiere cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Klick-Optionen:
 - CORS zur Funktions-URL hinzufügen
 - „content-type“-Header erlauben
 - Lambda-Funktion Zugriff auf DynamoDB gewähren


## Frontend

Ins frontend-Verzeichnis wechseln:

cd frontend
`vercel --prod` ausführen

## TODO
- Monitoring für Lambda-Funktionsnutzung
- Ein echtes Empfehlungscode-Mechanismus hinzufügen
- Zufallsbutton für Optionen
- Möglichkeit zum Hinzufügen von Extras wie Knoblauch, Rauch, Harissa, usw.
- Limit pro E-Mail beim Bestellen?
- Frontend verschönern
