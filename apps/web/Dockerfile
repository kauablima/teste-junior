FROM node:22-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json                            ./apps/web/
COPY packages/shared/package.json                    ./packages/shared/

RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules          ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm --filter @teste-junior/shared run build
RUN pnpm --filter @teste-junior/web run build

FROM nginx:alpine AS runtime

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
