FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "\
echo 'Waiting for DB...' && \
until nc -z db 5432; do sleep 1; done && \
echo 'DB is up' && \
npm run migrate:up -- --dbname \"$DATABASE_URL\" --migrations-dir migrations && \
node dist/server.js \
"]