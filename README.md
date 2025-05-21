# Mayournaise 🥚🧄

## Développement 💻

Une fois que vous avez créé un projet et installé les dépendances avec `npm install` (ou `pnpm install` ou `yarn`), démarrez un serveur de développement:

```bash
npm run dev

# ou démarrez le serveur et ouvrez l'application dans un nouvel onglet du navigateur
npm run dev -- --open
```

## Construction 🏗️

Pour créer une version de production de votre application:

```bash
npm run build
```

Vous pouvez prévisualiser la version de production avec `npm run preview`.

## Lambda ☁️

Installez cargo lambda avec `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


URL de la fonction: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Opérations manuelles:
 - ajouter CORS à l'URL de la fonction
 - autoriser l'en-tête content-type
 - autoriser la fonction Lambda à interagir avec DynamoDB


## Frontend 🖥️

Accédez au répertoire frontend
Exécutez `vercel --prod`

## À Faire 📝
- surveillance de l'utilisation des fonctions Lambda
- ajouter un véritable mécanisme de code de parrainage
- bouton de randomisation pour les options
- ajouter la possibilité d'ajouter des extras comme l'ail, la fumée, la harissa, etc.
- limite de commande par email?
- rendre l'interface utilisateur plus attrayante