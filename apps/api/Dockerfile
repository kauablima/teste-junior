FROM node:22-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json                            ./apps/api/
COPY packages/shared/package.json                    ./packages/shared/

RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules          ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .

RUN pnpm --filter @teste-junior/shared run build
RUN pnpm --filter @teste-junior/api exec prisma generate
RUN pnpm --filter @teste-junior/api run build

FROM node:22-alpine AS runtime
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/apps/api/node_modules   ./node_modules
COPY --from=build /app/apps/api/dist           ./dist
COPY --from=build /app/apps/api/prisma         ./prisma
COPY --from=build /app/apps/api/package.json   ./package.json

USER appuser

EXPOSE 3333

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/main"]