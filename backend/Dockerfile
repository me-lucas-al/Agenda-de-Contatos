FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && npx prisma generate

EXPOSE 3100

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
