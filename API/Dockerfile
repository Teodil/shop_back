FROM node:20-alpine

WORKDIR /app

#RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "\
npm run migrate:up -- --dbname \"$DATABASE_URL\" --migrations-dir migrations && \
node dist/server.js \
"]