FROM node:18-alpine

WORKDIR /usr/app

RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm prisma generate && pnpm run build

EXPOSE 3100

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm start"]
