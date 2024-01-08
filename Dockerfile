## state build
FROM node:18.18.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

# state node_modules
FROM node:18.18.0-alpine AS node_modules

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

## stage image
FROM node:18.18.0-alpine

ARG PORT=3103

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=node_modules /app/node_modules ./node_modules

EXPOSE $PORT

CMD ["node", "dist/main"]
