# Mayournaise 🥄

## Desenvolvimento 🚀

Depois de criar um projeto e instalar as dependências com `npm install` (ou `pnpm install` ou `yarn`), inicie um servidor de desenvolvimento:

```bash
npm run dev

# ou inicie o servidor e abra o aplicativo em uma nova aba do navegador
npm run dev -- --open
```

## Compilação 🏗️

Para criar uma versão de produção do seu aplicativo:

```bash
npm run build
```

Você pode visualizar a compilação de produção com `npm run preview`.

## Lambda ☁️

Instale o cargo lambda com `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL da função: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operações manuais necessárias:
 - Adicionar CORS à URL da função
 - Permitir o cabeçalho content-type
 - Permitir que a função Lambda acesse o DynamoDB

## Frontend 💻

Entre no diretório frontend
Execute `vercel --prod`

## A fazer ✅
- Monitoramento para uso da função Lambda
- Adicionar um mecanismo real de código de referência
- Botão de aleatorização para opções
- Adicionar capacidade de incluir extras como alho, defumado, harissa, etc.
- Limite por email para pedidos?
- Tornar o frontend mais bonito