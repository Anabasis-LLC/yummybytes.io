################################################################################
# BUILDER
################################################################################

FROM node:18.16.0-slim AS builder

ARG DATABASE_URL
ENV DATABASE_URL=DATABASE_URL

WORKDIR /build

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/

COPY ./apps/web/package.json ./apps/web/package.json
COPY ./packages/eslint-config-custom/package.json ./packages/eslint-config-custom/package.json
COPY ./packages/prettier-config/package.json ./packages/prettier-config/package.json
COPY ./packages/tsconfig/package.json ./packages/tsconfig/package.json
COPY ./packages/db/package.json ./packages/db/package.json
COPY ./packages/hooks/package.json ./packages/hooks/package.json
COPY ./packages/lib/package.json ./packages/lib/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json

RUN yarn install

COPY ./apps/web ./apps/web
COPY ./packages/eslint-config-custom ./packages/eslint-config-custom
COPY ./packages/prettier-config ./packages/prettier-config
COPY ./packages/tsconfig ./packages/tsconfig
COPY ./packages/db ./packages/db
COPY ./packages/hooks ./packages/hooks
COPY ./packages/lib ./packages/lib
COPY ./packages/ui ./packages/ui

# RUN yarn workspace db prisma generate
RUN yarn workspace web run build
RUN yarn workspaces focus web --production

################################################################################
# RUNNER
################################################################################

FROM node:18.15.0-slim AS runner

ENV NODE_ENV=production

RUN apt update && apt install -y procps curl

WORKDIR /app

COPY --from=builder --chown=node:node /build/apps/web/.next/standalone ./
COPY --from=builder --chown=node:node /build/apps/web/public ./apps/web/public
COPY --from=builder --chown=node:node /build/apps/web/.next/static ./apps/web/.next/static

USER node
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
