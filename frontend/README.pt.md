# React + TypeScript + Vite

Este modelo fornece uma configuração mínima para fazer o React funcionar no Vite com HMR e algumas regras do ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh

## Ampliando a configuração do ESLint

Se você está desenvolvendo uma aplicação para produção, recomendamos atualizar a configuração para habilitar regras de lint com verificação de tipos:

- Configure a propriedade `parserOptions` de nível superior desta forma:

```js
export default tseslint.config({
  languageOptions: {
    // outras opções...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Substitua `tseslint.configs.recommended` por `tseslint.configs.recommendedTypeChecked` ou `tseslint.configs.strictTypeChecked`
- Opcionalmente adicione `...tseslint.configs.stylisticTypeChecked`
- Instale [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) e atualize a configuração:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Defina a versão do react
  settings: { react: { version: '18.3' } },
  plugins: {
    // Adicione o plugin react
    react,
  },
  rules: {
    // outras regras...
    // Ative suas regras recomendadas
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```