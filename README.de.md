# Mayournaise 🥫

## Entwicklung 💻

Nachdem Sie ein Projekt erstellt und Abhängigkeiten mit `npm install` (oder `pnpm install` oder `yarn`) installiert haben, starten Sie einen Entwicklungsserver:

```bash
npm run dev

# oder starten Sie den Server und öffnen Sie die App in einem neuen Browser-Tab
npm run dev -- --open
```

## Erstellen einer Produktionsversion 🏗️

So erstellen Sie eine Produktionsversion Ihrer App:

```bash
npm run build
```

Sie können die Produktionsversion mit `npm run preview` anzeigen.

## Lambda 🚀

Installieren Sie cargo lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

Funktions-URL: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Manuelle Einstellungen:
 - CORS zur Funktions-URL hinzufügen
 - Content-Type-Header erlauben
 - Lambda-Funktion Zugriff auf DynamoDB gewähren

## Frontend 🖥️

Wechseln Sie in das Frontend-Verzeichnis
Führen Sie `vercel --prod` aus

## Noch zu tun 📝
- Überwachung der Lambda-Funktionsnutzung
- Einen echten Empfehlungscode-Mechanismus hinzufügen
- Zufallsbutton für Optionen
- Möglichkeit zum Hinzufügen von Extras wie Knoblauch, Rauch, Harissa usw.
- Bestelllimit pro E-Mail?
- Frontend verschönern