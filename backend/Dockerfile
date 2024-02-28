# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.0
FROM node:${NODE_VERSION}-alpine as base

ARG WORKDIR=/usr/src/app
WORKDIR ${WORKDIR}

# INSTALL
FROM base as deps

COPY package.json yarn.lock .

RUN yarn install --frozen-lockfile --production

RUN yarn global add @nestjs/cli
RUN yarn add sharp --ignore-engines

# BUILD
FROM deps as build

COPY . .

RUN yarn run build

# RUN
FROM base as final

ENV NODE_ENV production

USER node

COPY --from=deps ${WORKDIR}/node_modules ./node_modules
COPY --from=deps ${WORKDIR}/package.json .

COPY --from=build ${WORKDIR}/dist ./dist

EXPOSE 8000

CMD yarn migration:run && yarn start:prod
