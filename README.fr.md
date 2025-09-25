# Mayournaise

## Développement

Une fois que vous avez créé un projet et installé les dépendances avec `npm install` (ou `pnpm install` ou `yarn`), démarrez un serveur de développement :

```bash
npm run dev

# ou démarrez le serveur et ouvrez l'application dans un nouvel onglet du navigateur
npm run dev -- --open
```

## Construction

Pour créer une version de production de votre application :

```bash
npm run build
```

Vous pouvez prévisualiser la version de production avec `npm run preview`.

## Lambda

Installez cargo lambda avec `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


URL de la fonction : https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

opérations de clic :
 - ajouter CORS à l'URL de la fonction
 - autoriser l'en-tête content-type
 - permettre à la fonction lambda d'accéder à dynamodb


## Frontend

cd dans frontend
exécutez `vercel --prod`

## À FAIRE
- surveillance de l'utilisation de la fonction Lambda
- ajouter un vrai mécanisme de code de parrainage
- bouton de randomisation pour les options
- ajouter la possibilité d'ajouter des extras comme l'ail, la fumée, l'harissa, etc.
- limite par email sur les commandes ?
- rendre le frontend joli
