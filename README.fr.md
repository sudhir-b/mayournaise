# 🥫 Mayournaise (Version Française) 🇫🇷

## 🛠️ Développement

Une fois que vous avez créé un projet et installé les dépendances avec `npm install` (ou `pnpm install` ou `yarn`), lancez un serveur de développement :

```bash
npm run dev

# ou démarrez le serveur et ouvrez l'application dans un nouvel onglet du navigateur
npm run dev -- --open
```

## 🏗️ Construction

Pour créer une version de production de votre application :

```bash
npm run build
```

Vous pouvez pré-visualiser le build de production avec `npm run preview`.

## ☁️ Lambda

Installez Cargo Lambda avec la commande :

```bash
curl -fsSL https://cargo-lambda.info/install.sh | sh
```

Ensuite :

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL de la fonction : https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Actions à effectuer dans la console AWS :
- 🔄 Ajouter CORS à l'URL de la fonction
- 📥 Autoriser l'en-tête `content-type`
- 🔑 Autoriser la fonction Lambda à accéder à DynamoDB

## 🎨 Frontend

Positionnez-vous dans le dossier `frontend` :

```bash
cd frontend
```

Puis déployez avec :

```bash
vercel --prod
```

## 📋 À FAIRE

- 🚨 Mettre en place la surveillance (monitoring) de l'utilisation de la fonction Lambda
- 🏷️ Ajouter un véritable mécanisme de code de parrainage
- 🎲 Bouton de randomisation pour les options
- ➕ Ajouter la possibilité d'ajouter des extras (ail, fumé, harissa, etc.)
- 📧 Limite par e-mail sur la commande ?
- 💅 Embellir le frontend
