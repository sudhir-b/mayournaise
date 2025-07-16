# Mayournaise

## Desenvolvendo

Depois de criar um projeto e instalar as dependências com `npm install` (ou `pnpm install` ou `yarn`), inicie um servidor de desenvolvimento:

```bash
npm run dev

# ou iniciar o servidor e abrir o app em uma nova aba do navegador
npm run dev -- --open
```

## Construindo

Para criar uma versão de produção do seu app:

```bash
npm run build
```

Você pode visualizar a build de produção com `npm run preview`.

## Lambda

Instale o cargo lambda com `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


url da função: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

operações manuais:
 - adicionar cors à url da função
 - permitir header content-type
 - permitir que a função lambda acesse o dynamodb


## Frontend

navegue até a pasta frontend
execute `vercel --prod`

## TODO
- monitoramento para uso da função Lambda
- adicionar um mecanismo real de código de referência
- botão randomizar para opções
- adicionar capacidade de adicionar extras como alho, fumaça, harissa, etc.
- limite por email para pedidos?
- tornar frontend bonito