# Mayournaise

## Entwicklung

Nachdem Sie ein Projekt erstellt und die Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Erstellen

Um eine Produktionsversion Ihrer Anwendung zu erstellen:

```bash
npm run build
```

Sie können die Produktions-Build mit `npm run preview` in der Vorschau anzeigen.

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

cd into frontend
run `vercel --prod`

## ZU ERLEDIGEN
- Überwachung für Lambda-Funktionsnutzung
- echten Empfehlungscode-Mechanismus hinzufügen
- Zufalls-Button für Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa usw. hinzuzufügen
- E-Mail-basierte Bestellbegrenzung?
- Frontend verschönern
