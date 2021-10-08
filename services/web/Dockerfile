FROM node:16 as base
ENV CI=true
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

FROM base as dev
ENV NODE_ENV=development
ENTRYPOINT [ "yarn", "dev" ]

FROM base as prod
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
RUN yarn build
ENTRYPOINT ["yarn", "start"]