# React + TypeScript + Vite

Diese Vorlage bietet eine minimale Einrichtung, um React in Vite mit HMR und einigen ESLint-Regeln zum Laufen zu bringen.

Derzeit sind zwei offizielle Plugins verfügbar:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) verwendet [Babel](https://babeljs.io/) für Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) verwendet [SWC](https://swc.rs/) für Fast Refresh

## Erweitern der ESLint-Konfiguration

Wenn Sie eine Produktionsanwendung entwickeln, empfehlen wir die Aktualisierung der Konfiguration, um typbewusste Lint-Regeln zu aktivieren:

- Konfigurieren Sie die Top-Level-Eigenschaft `parserOptions` folgendermaßen:

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

- Ersetzen Sie `tseslint.configs.recommended` durch `tseslint.configs.recommendedTypeChecked` oder `tseslint.configs.strictTypeChecked`
- Fügen Sie optional `...tseslint.configs.stylisticTypeChecked` hinzu
- Installieren Sie [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) und aktualisieren Sie die Konfiguration:

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
