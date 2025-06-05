# 🥪 Mayournaise

*[This document is also available in English.](README.md)*

## 🚀 Entwicklung

Nachdem du ein Projekt erstellt und die Abhängigkeiten mit `npm install` (oder `pnpm install` bzw. `yarn`) installiert hast, starte den Entwicklungsserver:

```bash
npm run dev

# oder starte den Server und öffne die App in einem neuen Browser-Tab
npm run dev -- --open
```

## 🏗️ Build (Erstellung einer Produktionsversion)

Um eine Produktionsversion deiner App zu erstellen:

```bash
npm run build
```

Mit `npm run preview` kannst du den Produktions-Build testen.

## ☁️ Lambda

Installiere Cargo Lambda mit `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

🔗 function url: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

🖱️ click ops:
 - 🟢 CORS für function url aktivieren
 - 🟡 Content-Type Header erlauben
 - 🗄️ Lambda-Funktion Zugriff auf DynamoDB gewähren

## 💻 Frontend

Gehe ins Verzeichnis `frontend`:
Starte dann `vercel --prod`

## 📝 TODO
- 🕵️‍♂️ Überwachung der Lambda-Funktion einrichten
- 📨 Echte Empfehlungs-Code-Mechanik hinzufügen
- 🎲 Button für zufällige Optionen
- 🧄 Möglichkeit, Extras wie Knoblauch, Rauch, Harissa usw. auszuwählen
- 📧 Limit pro E-Mail beim Bestellen?
- 🎨 Frontend schöner gestalten
