# React + TypeScript + Vite

Ce template fournit une configuration minimale pour faire fonctionner React avec Vite en incluant HMR (Hot Module Replacement) et quelques règles ESLint.

## Plugins Officiels Disponibles

Actuellement, deux plugins officiels sont disponibles :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utilise [Babel](https://babeljs.io/) pour le Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utilise [SWC](https://swc.rs/) pour le Fast Refresh

## Extension de la Configuration ESLint

Si vous développez une application de production, nous recommandons de mettre à jour la configuration pour activer les règles de lint sensibles au type :

### Configuration des Options de Parser

Configurez la propriété `parserOptions` de niveau supérieur comme ceci :

```js
export default tseslint.config({
  languageOptions: {
    // autres options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### Mise à Jour des Configurations ESLint

- Remplacez `tseslint.configs.recommended` par `tseslint.configs.recommendedTypeChecked` ou `tseslint.configs.strictTypeChecked`
- Optionnellement, ajoutez `...tseslint.configs.stylisticTypeChecked`

### Installation et Configuration du Plugin React

- Installez [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) et mettez à jour la configuration :

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Définir la version de React
  settings: { react: { version: '18.3' } },
  plugins: {
    // Ajouter le plugin react
    react,
  },
  rules: {
    // autres règles...
    // Activer ses règles recommandées
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Scripts de Développement

- `bun run dev` - Démarre le serveur de développement Vite avec HMR
- `bun run build` - Compile l'application avec TypeScript et crée un build de production
- `bun run lint` - Exécute ESLint pour analyser le code et détecter les problèmes
- `bun run preview` - Prévisualise le build de production localement

## Configuration du Projet

Ce template est configuré avec :

- **React 18** - Dernière version de React avec support des nouvelles fonctionnalités
- **TypeScript** - Support complet du typage statique
- **Vite** - Build tool rapide avec HMR
- **ESLint** - Linting pour maintenir la qualité du code
- **SWC** - Compilateur JavaScript/TypeScript rapide pour le Fast Refresh

## Structure Recommandée

Pour une application de production, considérez cette structure :

```
src/
├── components/          # Composants React réutilisables
├── hooks/              # Hooks personnalisés
├── pages/              # Composants de page
├── types/              # Définitions de types TypeScript
├── utils/              # Fonctions utilitaires
└── main.tsx            # Point d'entrée de l'application
```

---

*Template React + TypeScript + Vite pour le développement moderne*
