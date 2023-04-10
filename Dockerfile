# develop stage
FROM node:14.18-alpine3.14 as develop-stage
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache git
RUN npm install
RUN npm install chart.piecelabel.js
COPY ./ .

# build stage
FROM develop-stage as build-stage
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
