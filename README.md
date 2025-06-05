# Mayournaise

## Développement

Une fois que vous avez créé un projet et installé les dépendances avec `npm install` (ou `pnpm install` ou `yarn`), démarrez un serveur de développement :

```bash
npm run dev

# ou démarrez le serveur et ouvrez l'application dans un nouvel onglet de navigateur
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

url de la fonction : https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

opérations à cliquer :
 - ajouter CORS à l'url de la fonction
 - autoriser l'en-tête content-type
 - autoriser la fonction lambda à accéder à dynamodb


## Frontend

Allez dans le dossier frontend
Exécutez `vercel --prod`

## À FAIRE
- surveillance de l'utilisation de la fonction Lambda
- ajouter un vrai mécanisme de code de parrainage
- bouton de randomisation pour les options
- ajouter la possibilité d'ajouter des extras comme ail, fumée, harissa, etc.
- limite par e-mail pour les commandes ?
- rendre le frontend joli
