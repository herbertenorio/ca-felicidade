FROM node:lts-alpine as builder

WORKDIR /usr/src/app
COPY ["package*.json", "yarn.lock", "tsconfig.json", "./"]
COPY prisma ./prisma/
RUN yarn install --frozen-lockfile
RUN yarn prisma generate
COPY . .
RUN yarn tsc

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/tsconfig.json ./
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3333
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "run", "start"]
