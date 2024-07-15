## SIWE-AUTH backend
> This is backend created using ```siwe``` sign in with ethereum.we create a jwt token in backend and
in frontend using this token we will authorize the user to our application

## How to start
> To start the project follow below steps
1. Go Inside ```SIWE-BACKEND``` folder for backend.
2. npm i
3. npm run dev - To start in development for local development
4. npm run start - To start in production mode

## env
> Create a ```.env.dev``` for development and ```.env.prod``` for production
PORT='xxxxxxxxxx'
TOKEN_EXPIRY='xx'
TOKEN_SECRET_KEY='xxxxxxxxxx'
SESSION_SECRET_KEY='xxxxxxxxxx'
SESSION_EXPIRY='xxx'

## How to contribute

## To update the swagger document
1. First run build command
 ```npm run build```
2. To create update API document
```npm run swagger```