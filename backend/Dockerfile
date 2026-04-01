FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

COPY . .

RUN pnpm run build && pnpm prisma generate

EXPOSE 3100

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm start"]
