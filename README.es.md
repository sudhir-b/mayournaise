# Mayournaise

## Desarrollo

Una vez que hayas creado un proyecto e instalado las dependencias con `npm install` (o `pnpm install` o `yarn`), inicia un servidor de desarrollo:

```bash
npm run dev

# o inicia el servidor y abre la aplicación en una nueva pestaña del navegador
yarn dev -- --open
```

## Compilación

Para crear una versión de producción de tu aplicación:

```bash
npm run build
```

Puedes previsualizar la compilación de producción con `npm run preview`.

## Lambda

Instala cargo lambda con:

```bash
curl -fsSL https://cargo-lambda.info/install.sh | sh
```

Construye y despliega la función lambda:

```bash
cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal
```

URL de la función: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operaciones adicionales:
- Añadir CORS a la URL de la función
- Permitir cabecera content-type
- Permitir que la función lambda acceda a DynamoDB

## Frontend

Ve al directorio frontend y ejecuta:

```bash
vercel --prod
```

## POR HACER
- Monitoreo del uso de la función Lambda
- Agregar un mecanismo de codigo de referido real
- Botón de aleatorizar opciones
- Agregar la opción de extras como ajo, humo, harissa, etc.
- Límite de pedidos por correo electrónico
- Mejorar el diseño frontend
