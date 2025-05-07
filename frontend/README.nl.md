# React + TypeScript + Vite

Deze template biedt een minimale setup om React werkend te krijgen in Vite met HMR en enkele ESLint regels.

Momenteel zijn er twee officiële plugins beschikbaar:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) gebruikt [Babel](https://babeljs.io/) voor Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) gebruikt [SWC](https://swc.rs/) voor Fast Refresh

## De ESLint configuratie uitbreiden

Als je een productieapplicatie ontwikkelt, raden we aan de configuratie bij te werken om type-aware lint regels in te schakelen:

- Configureer de `parserOptions` eigenschap op het hoogste niveau als volgt:

```js
export default tseslint.config({
  languageOptions: {
    // andere opties...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Vervang `tseslint.configs.recommended` door `tseslint.configs.recommendedTypeChecked` of `tseslint.configs.strictTypeChecked`
- Voeg optioneel `...tseslint.configs.stylisticTypeChecked` toe
- Installeer [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) en werk de config bij:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Stel de react versie in
  settings: { react: { version: '18.3' } },
  plugins: {
    // Voeg de react plugin toe
    react,
  },
  rules: {
    // andere regels...
    // Schakel de aanbevolen regels in
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```