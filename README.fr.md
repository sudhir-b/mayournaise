# Mayournaise (FR)

Ce document est la traduction française du README principal. Il résume les étapes pour développer, construire et déployer l’application Mayournaise.

## Développement

Après avoir créé le projet et installé les dépendances avec `npm install` (ou `pnpm install`, ou `yarn`), lancez un serveur de développement :

```bash
npm run dev

# ou démarrez le serveur ET ouvrez automatiquement l’application dans un nouvel onglet du navigateur
npm run dev -- --open
```

## Construction (build)

Pour créer une version de production de votre application :

```bash
npm run build
```

Vous pouvez pré-visualiser le build de production avec :

```bash
npm run preview
```

## Lambda (Backend Serverless)

Installez cargo-lambda avec la commande :

```bash
curl -fsSL https://cargo-lambda.info/install.sh | sh
```

Ensuite, construisez et déployez la fonction Lambda :

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL de la fonction :

```
https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/
```

Étapes complémentaires dans la console AWS ("click-ops") :

- Ajouter CORS à l’URL de la fonction
- Autoriser l’en-tête `Content-Type`
- Donner à la fonction Lambda l’autorisation d’accéder à DynamoDB

## Frontend

```bash
cd frontend
vercel --prod
```

## TODO

- Monitoring de l’usage de la fonction Lambda
- Ajouter un vrai mécanisme de code de parrainage
- Bouton de randomisation des options
- Ajouter la possibilité d’ajouter des extras (ail, fumé, harissa, etc.)
- Limite de commandes par e-mail ?
- Améliorer le design du frontend
