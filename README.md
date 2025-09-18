# Mayournaise

## Développement (Developing)

Une fois que vous avez créé un projet et installé les dépendances avec `npm install` (ou `pnpm install` ou `yarn`), démarrez un serveur de développement :

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Build (Building)

Pour créer une version de production de votre application :

```bash
npm run build
```

Vous pouvez prévisualiser la version de production avec `npm run preview`.

## Lambda

Installez cargo lambda avec `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


function url: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

click ops:
 - ajouter CORS à l’URL de la fonction (add CORS to function URL)
 - autoriser l’en-tête Content-Type (allow Content-Type header)
 - autoriser la fonction Lambda à accéder à DynamoDB (allow Lambda function to touch DynamoDB)


## Frontend

Placez-vous dans le dossier frontend
Exécutez `vercel --prod`

## À faire (TODO)
- surveillance/monitoring de l’utilisation de la fonction Lambda
- ajouter un véritable mécanisme de code de parrainage (referral code)
- bouton pour rendre les options aléatoires (randomise button)
- ajouter la possibilité d’extras comme ail, fumée, harissa, etc.
- limite par e‑mail sur les commandes ?
- améliorer l’apparence du frontend (make frontend pretty)
