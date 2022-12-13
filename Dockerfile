FROM node:16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install
COPY ./ ./

RUN npm run publish 
FROM nginx:1.17.1-alpine
EXPOSE 80
ENV DATABASE_USERNAME ""
ENV DATABASE_PASSWORD ""
ENV API_KEY ""

COPY --from=build-step /app/build /usr/share/nginx/html