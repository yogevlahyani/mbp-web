FROM node:16 as base
ENV CI=true
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

FROM base as build
RUN yarn build

FROM build as dev
ENV CI=true
ENV NODE_ENV=development
CMD [ "yarn", "dev" ]

FROM node:16 as production
WORKDIR /app
ENV NODE_ENV production
COPY --from=build /app ./

RUN yarn install --frozen-lockfile --production

EXPOSE 3000
CMD ["yarn", "start"]