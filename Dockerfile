FROM node:24-alpine AS builder

WORKDIR /app

# Копируем package и tsconfig
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Билдим Nuxt
RUN npm run build

# PROD образ
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.output /app/.output

# Логи
VOLUME ["/app/logs"]

ENV NODE_ENV=production
EXPOSE 3000

RUN apk add curl

CMD ["node", ".output/server/index.mjs"]