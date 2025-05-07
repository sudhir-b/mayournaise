# React + TypeScript + Vite

Ten szablon zapewnia minimalne ustawienia, aby React działał w Vite z HMR i niektórymi regułami ESLint.

Obecnie dostępne są dwie oficjalne wtyczki:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) używa [Babel](https://babeljs.io/) dla Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) używa [SWC](https://swc.rs/) dla Fast Refresh

## Rozszerzanie konfiguracji ESLint

Jeśli tworzysz aplikację produkcyjną, zalecamy zaktualizowanie konfiguracji, aby włączyć reguły lint świadome typów:

- Skonfiguruj właściwość `parserOptions` najwyższego poziomu w następujący sposób:

```js
export default tseslint.config({
  languageOptions: {
    // inne opcje...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Zamień `tseslint.configs.recommended` na `tseslint.configs.recommendedTypeChecked` lub `tseslint.configs.strictTypeChecked`
- Opcjonalnie dodaj `...tseslint.configs.stylisticTypeChecked`
- Zainstaluj [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) i zaktualizuj konfigurację:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Ustaw wersję react
  settings: { react: { version: '18.3' } },
  plugins: {
    // Dodaj wtyczkę react
    react,
  },
  rules: {
    // inne reguły...
    // Włącz zalecane reguły
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```