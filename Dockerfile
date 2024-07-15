FROM --platform=linux/amd64 node:20-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM --platform=linux/amd64 node:20-alpine as production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/.env ./
COPY --from=build /app/swagger.yaml ./
RUN yarn install --production


EXPOSE 6001
CMD ["yarn", "start"]