# Mayournaise

## Programowanie

Po utworzeniu projektu i zainstalowaniu zależności za pomocą `npm install` (lub `pnpm install` lub `yarn`), uruchom serwer deweloperski:

```bash
npm run dev

# lub uruchom serwer i otwórz aplikację w nowej karcie przeglądarki
npm run dev -- --open
```

## Budowanie

Aby utworzyć wersję produkcyjną aplikacji:

```bash
npm run build
```

Możesz podejrzeć wersję produkcyjną za pomocą `npm run preview`.

## Lambda

Zainstaluj cargo lambda za pomocą `curl -fsSL https://cargo-lambda.info/install.sh | sh`

cargo lambda build --arm64 --release
cargo lambda deploy --enable-function-url mayournaise --profile personal


URL funkcji: https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws/

Operacje konfiguracyjne:
 - dodaj CORS do URL funkcji
 - zezwól na nagłówek content-type
 - zezwól funkcji Lambda na dostęp do DynamoDB


## Frontend

Przejdź do katalogu frontend
Uruchom `vercel --prod`

## Do zrobienia
- monitoring wykorzystania funkcji Lambda
- dodanie prawdziwego mechanizmu kodów polecających
- przycisk losowania opcji
- dodanie możliwości dodawania dodatków, takich jak czosnek, dym, harissa itp.
- limit zamówień na adres e-mail?
- upiększenie frontendu