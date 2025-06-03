# Mayournaise

## Desenvolvimento

Depois de criar um projeto e instalar as dependências com `npm install` (ou `pnpm install` ou `yarn`), inicie um servidor de desenvolvimento:

```bash
npm run dev

# ou inicie o servidor e abra o aplicativo em uma nova aba do navegador
npm run dev -- --open
```

## Compilação

Para criar uma versão de produção do seu aplicativo:

```bash
npm run build
```

Você pode visualizar a compilação de produção com `npm run preview`.

## Lambda

Instale o cargo lambda com `curl -fsSL https://cargo-lambda.info/install.sh | sh`

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL da função: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operações manuais:
 - adicione CORS à URL da função
 - permita o cabeçalho content-type
 - permita que a função lambda acesse o dynamodb

## Frontend

Navegue até a pasta `frontend`
Execute `vercel --prod`

## A Fazer
- monitoramento para o uso da função Lambda
- adicionar um mecanismo real de código de referência
- botão de randomizar para as opções
- adicionar a capacidade de adicionar extras como alho, fumaça, harissa, etc.
- limite de pedidos por e-mail?
- tornar o frontend bonito
