# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.0
FROM node:${NODE_VERSION}-alpine as base

ARG WORKDIR=/user/src/app
WORKDIR ${WORKDIR}

# INSTALL
FROM base as deps

COPY package.json package-lock.json .

RUN npm ci --omit=dev
RUN npm install -g next

# BUILD
FROM deps as build

COPY . .

RUN npm run build

# RUN
FROM base as final

ENV NODE_ENV production

USER node

COPY package.json .
COPY public ./public

COPY --from=deps ${WORKDIR}/node_modules ./node_modules
COPY --from=build ${WORKDIR}/.next ./.next

EXPOSE 3000

CMD npm start
