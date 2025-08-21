# React + TypeScript + Vite

Ce modèle fournit une configuration minimale pour faire fonctionner React dans Vite avec HMR et quelques règles ESLint.

Actuellement, deux plugins officiels sont disponibles :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utilise [Babel](https://babeljs.io/) pour Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utilise [SWC](https://swc.rs/) pour Fast Refresh

## Extension de la configuration ESLint

Si vous développez une application de production, nous vous recommandons de mettre à jour la configuration pour activer les règles de linting sensibles au type :

- Configurez la propriété `parserOptions` de haut niveau comme ceci :

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Remplacez `tseslint.configs.recommended` par `tseslint.configs.recommendedTypeChecked` ou `tseslint.configs.strictTypeChecked`
- Ajoutez éventuellement `...tseslint.configs.stylisticTypeChecked`
- Installez [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) et mettez à jour la configuration :

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Définir la version de react
  settings: { react: { version: '18.3' } },
  plugins: {
    // Ajouter le plugin react
    react,
  },
  rules: {
    // other rules...
    // Activer ses règles recommandées
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
