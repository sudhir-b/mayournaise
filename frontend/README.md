# React + TypeScript + Vite

Ce modèle fournit une configuration minimale pour faire fonctionner React dans Vite avec HMR et quelques règles ESLint.

Actuellement, deux plugins officiels sont disponibles :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utilise [Babel](https://babeljs.io/) pour Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utilise [SWC](https://swc.rs/) pour Fast Refresh

## Extension de la configuration ESLint

Si vous développez une application de production, nous recommandons de mettre à jour la configuration pour activer les règles de lint conscientes des types :

- Configurez la propriété `parserOptions` de niveau supérieur comme ceci :

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
- Ajoutez optionnellement `...tseslint.configs.stylisticTypeChecked`
- Installez [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) et mettez à jour la configuration :

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
