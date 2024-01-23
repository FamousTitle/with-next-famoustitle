# GroundZero NextJS v2

## Run the app

```
docker run -it -v=$PWD:/app -w=/app -p=3000:3000 vleango/node:20.10.0_2 npm install
```

```
docker run -it -v=$PWD:/app -w=/app -p=3000:3000 vleango/node:20.10.0_2 npm run dev
```

## TODOs

- authentication
- CMS
- materialUI

https://dev.to/prisma/passwordless-authentication-with-next-js-prisma-and-next-auth-5g8g

```
npx prisma init
```

- only initial

```
npx prisma migrate dev
```
