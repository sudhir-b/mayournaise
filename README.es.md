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

operaciones de clic:
 - agregar cors a la URL de la función
 - permitir el encabezado content-type
 - permitir que la función lambda acceda a dynamodb


## Frontend

cd al directorio frontend
ejecuta `vercel --prod`

## TAREAS PENDIENTES
- monitoreo del uso de la función Lambda
- agregar un mecanismo real de código de referencia
- botón aleatorio para opciones
- agregar capacidad de añadir extras como ajo, humo, harissa, etc.
- ¿límite por email en los pedidos?
- hacer que el frontend sea bonito