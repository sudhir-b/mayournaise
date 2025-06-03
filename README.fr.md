# Mayournaise

## Développement

Une fois que vous avez créé un projet et installé les dépendances avec `npm install` (ou `pnpm install` ou `yarn`), lancez un serveur de développement :

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

Vous pouvez prévisualiser la construction de production avec `npm run preview`.

## Lambda

Installez cargo lambda avec `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL de la fonction : https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Opérations manuelles :
 - ajouter CORS à l'URL de la fonction
 - autoriser l'en-tête content-type
 - permettre à la fonction lambda d'accéder à DynamoDB

## Frontend

Naviguez dans le dossier frontend
Exécutez `vercel --prod`

## À FAIRE
- surveillance de l'utilisation de la fonction Lambda
- ajouter un vrai mécanisme de code de parrainage
- bouton de randomisation pour les options
- ajouter la possibilité d'ajouter des extras comme l'ail, fumé, harissa, etc.
- limite par email sur les commandes ?
- rendre le frontend plus joli

## À propos de Mayournaise

Mayournaise est une application web ludique qui permet aux utilisateurs de créer leur mayonnaise personnalisée en choisissant parmi différents types d'huiles, œufs, acides et moutardes. Cette application comprend :

- **Frontend** : Interface utilisateur React avec Tailwind CSS
- **Backend** : Fonction AWS Lambda écrite en Rust
- **Base de données** : DynamoDB pour la gestion des stocks et des commandes

### Fonctionnalités
- Sélection d'ingrédients personnalisée (huile, œuf, acide, moutarde)
- Gestion des stocks en temps réel
- Système de réservation par email
- Bouton de randomisation pour des combinaisons surprises
- Interface responsive et moderne

**Note** : Pour des raisons légales, ce n'est pas une vraie entreprise alimentaire. Vous êtes seul responsable du goût résultant !