# Mayournaise

## Desenvolvimento

Depois de criar um projeto e instalar as dependências com `npm install` (ou `pnpm install` ou `yarn`), inicie um servidor de desenvolvimento:

```bash
npm run dev

# ou inicie o servidor e abra o aplicativo em uma nova aba do navegador
npm run dev -- --open
```

## Build

Para criar uma versão de produção do seu aplicativo:

```bash
npm run build
```

Você pode visualizar a build de produção com `npm run preview`.

## Lambda

Instale o cargo lambda com `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


URL da função: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operações manuais:
 - adicionar CORS à URL da função
 - permitir o cabeçalho content-type
 - permitir que a função lambda acesse o DynamoDB


## Frontend

Entre na pasta frontend
Execute `vercel --prod`

## A fazer
- monitoramento para o uso da função Lambda
- adicionar um mecanismo real de código de referência
- botão de aleatorização para opções
- adicionar capacidade de incluir extras como alho, defumado, harissa, etc.
- limite por e-mail para pedidos?
- tornar o frontend bonito