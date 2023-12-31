# Node v20.0.0
FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine AS server

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE $APP_PORT

CMD ["npm", "start"]