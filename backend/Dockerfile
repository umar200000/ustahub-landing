FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .

RUN mkdir -p /app/data /app/uploads && \
    DB_PATH=/app/data/ustahub.db node seed.js

EXPOSE 5000

CMD ["node", "server.js"]
