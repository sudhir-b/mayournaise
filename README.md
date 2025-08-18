# Mayournaise

Une application amusante de commande de mayonnaise personnalisée créée comme projet personnel.

## Description du Projet

Mayournaise est une application web serverless qui permet aux utilisateurs de commander de la mayonnaise personnalisée en sélectionnant leurs ingrédients préférés. L'application gère l'inventaire en temps réel et traite les commandes de manière atomique avec des mises à jour automatiques du stock.

**Note importante :** Pour des raisons légales, ce n'est pas une entreprise alimentaire commerciale. Cette application est destinée à un usage personnel entre contacts connus uniquement.

## Stack Technique

### Backend
- **Langage :** Rust
- **Runtime :** AWS Lambda avec runtime Rust
- **Base de données :** AWS DynamoDB (2 tables : inventaire et commandes)
- **SDK :** AWS SDK pour Rust (DynamoDB)
- **Framework HTTP :** lambda_http avec support d'API Gateway

### Frontend
- **Framework :** React 18 avec TypeScript
- **Build Tool :** Vite
- **Gestionnaire d'état :** TanStack Query (React Query)
- **Gestion des formulaires :** React Hook Form
- **Styling :** Tailwind CSS
- **Gestionnaire de paquets :** Bun

### Déploiement
- **Backend :** AWS Lambda avec Function URL
- **Frontend :** Vercel
- **CI/CD :** GitHub Actions pour le build et typecheck du frontend

## Architecture

### Vue d'ensemble
L'application suit une architecture serverless avec :
- Une fonction AWS Lambda servant d'API RESTful
- DynamoDB pour le stockage persistant
- Une application React SPA communiquant avec l'API Lambda
- Opérations transactionnelles pour assurer l'intégrité des données

### Endpoints API
- `GET /inventory` - Récupère l'inventaire actuel des ingrédients
- `POST /order` - Soumet une nouvelle commande de mayonnaise

### Schéma de Base de Données

**Table mayournaise-inventory :**
- `type` (String) : Type d'ingrédient (oil, egg, acid, mustard)
- `name` (String) : Nom spécifique de l'ingrédient
- `stock` (Number) : Quantité disponible

**Table mayournaise-orders :**
- `email_address` (String) : Email du client
- `timestamp` (Number) : Horodatage de la commande
- `oil`, `egg`, `acid`, `mustard` (String) : Ingrédients sélectionnés

## Fonctionnalités

### Gestion d'Inventaire
- Affichage en temps réel des options d'ingrédients disponibles
- Indication des niveaux de stock pour chaque ingrédient
- Désactivation automatique des options en rupture de stock
- Catégorisation des ingrédients par type (huile, œuf, acide, moutarde)

### Système de Commande
- Sélection d'ingrédients via interface dropdown
- Validation d'email pour le suivi des commandes
- Prévention des soumissions en double
- Mises à jour atomiques (création de commande + décrément d'inventaire)
- Confirmation de commande avec état "Réservé!"

### Fonctionnalités Supplémentaires
- **Randomisation des ingrédients :** Bouton pour sélectionner automatiquement des ingrédients aléatoirement
- **Design responsive :** Interface optimisée pour mobile et desktop
- **Validation de formulaire :** Validation côté client avec messages d'erreur
- **Gestion d'état :** Cache intelligent avec TanStack Query

## Développement

### Prérequis
- Rust (édition 2021)
- Bun (pour les dépendances frontend)
- AWS CLI configuré
- Cargo Lambda

### Installation et Configuration

#### Backend
```bash
cd backend

# Installer cargo lambda
curl -fsSL https://cargo-lambda.info/install.sh | sh

# Build du projet
cargo lambda build --arm64 --release

# Déploiement sur AWS
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

#### Configuration AWS requise (Click Ops)
- Ajouter CORS à la Function URL
- Autoriser l'en-tête content-type
- Donner les permissions à la fonction Lambda pour accéder à DynamoDB

#### Frontend
```bash
cd frontend

# Installer les dépendances
bun install

# Serveur de développement
bun run dev

# Build de production
bun run build

# Prévisualisation du build
bun run preview
```

### Scripts de Développement

#### Frontend
- `bun run dev` - Démarre le serveur de développement Vite
- `bun run build` - Crée un build de production (TypeScript + Vite)
- `bun run lint` - Exécute ESLint pour la vérification du code
- `bun run preview` - Prévisualise le build de production

#### Backend
- `cargo build` - Compile le projet Rust
- `cargo lambda build` - Compile pour AWS Lambda
- `cargo lambda deploy` - Déploie sur AWS Lambda

## Déploiement

### Backend (AWS Lambda)
1. Compiler avec `cargo lambda build --arm64 --release`
2. Déployer avec `cargo lambda deploy --enable-function-url mayournaise`
3. Configurer CORS et permissions DynamoDB via la console AWS

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

## URL de Production
- **API Backend :** https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/
- **Frontend :** Déployé sur Vercel

## TODO et Améliorations Futures
- Monitoring d'utilisation de la fonction Lambda
- Mécanisme de code de parrainage réel
- Capacité d'ajouter des extras (ail, fumé, harissa, etc.)
- Limitation par email sur les commandes
- Améliorations esthétiques du frontend
- Notifications par email automatiques
- Tests unitaires et d'intégration
- Gestion d'erreurs plus robuste

## Structure du Projet
```
.
├── README.md                 # Documentation principale (ce fichier)
├── backend/                  # API Rust + AWS Lambda
│   ├── src/main.rs          # Logique principale de l'API
│   ├── Cargo.toml           # Dépendances Rust
│   └── Cargo.lock           # Lock file des dépendances
├── frontend/                 # Application React
│   ├── src/                 # Code source TypeScript/React
│   ├── package.json         # Dépendances Node.js
│   ├── vite.config.ts       # Configuration Vite
│   └── tailwind.config.js   # Configuration Tailwind CSS
└── .github/                 # Configuration CI/CD
    └── workflows/           # Actions GitHub
```

## Licence et Disclaimers

Ce projet est un projet personnel amusant et n'est pas une entreprise alimentaire commerciale. L'utilisation est limitée aux contacts personnels de l'auteur. Vous êtes seul responsable du goût résultant de votre mayonnaise !

---

*Un projet rigolo par Sudhir* 🥄
