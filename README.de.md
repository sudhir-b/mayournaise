# Mayournaise

Diese README ist auch auf Englisch verfügbar: [README.md](README.md)

## Entwicklung

Nachdem du ein Projekt erstellt und die Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert hast, kannst du einen Entwicklungsserver starten:

```bash
npm run dev

# oder den Server starten und die App in einem neuen Browser-Tab öffnen
npm run dev -- --open
```

## Build

Um eine Produktionsversion deiner App zu erstellen:

```bash
npm run build
```

Die Produktionsversion kannst du mit `npm run preview` lokal ansehen.

## Lambda

Installiere cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal

Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Manuelle Schritte in der AWS-Konsole:
- CORS für die Funktions-URL aktivieren
- Den Header `content-type` erlauben
- Der Lambda-Funktion Zugriff auf DynamoDB gewähren

## Frontend

In das Verzeichnis `frontend` wechseln
`vercel --prod` ausführen

## Zu erledigen
- Monitoring/Nutzungsüberwachung für die Lambda-Funktion
- Einen echten Referral-/Empfehlungscode-Mechanismus hinzufügen
- Zufalls-Button für Optionen
- Möglichkeit hinzufügen, Extras wie Knoblauch, Rauch, Harissa etc. auszuwählen
- Limit pro E-Mail für Bestellungen?
- Frontend hübscher gestalten
