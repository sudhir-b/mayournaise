# Mayournaise

## Desarrollo

Una vez que hayas creado un proyecto e instalado las dependencias con `npm install` (o `pnpm install` o `yarn`), inicia un servidor de desarrollo:

```bash
npm run dev

# o inicia el servidor y abre la aplicación en una nueva pestaña del navegador
npm run dev -- --open
```

## Compilación

Para crear una versión de producción de tu aplicación:

```bash
npm run build
```

Puedes previsualizar la compilación de producción con `npm run preview`.

## Lambda

Instala cargo lambda con `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


URL de la función: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operaciones manuales:
 - agregar CORS a la URL de la función
 - permitir el encabezado content-type
 - permitir que la función Lambda interactúe con DynamoDB


## Frontend

Navega al directorio frontend
Ejecuta `vercel --prod`

## Pendientes
- monitoreo del uso de funciones Lambda
- agregar un mecanismo real de código de referencia
- botón de aleatorización para opciones
- agregar la capacidad de incluir extras como ajo, humo, harissa, etc.
- ¿límite por correo electrónico para realizar pedidos?
- hacer que el frontend sea más atractivo