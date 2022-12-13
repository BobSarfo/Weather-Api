FROM node:16-alpine as base
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install
COPY ./ ./

RUN npm run publish 

COPY --from=base /build /build
ENV DATABASE_USERNAME ""
ENV DATABASE_PASSWORD ""
ENV API_KEY ""
ENV PORT "3000"

FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /app/build .
RUN npm install pm2 -g
ENV DATABASE_USERNAME "postgres"
ENV DATABASE_PASSWORD "postgres"
ENV DATABASE "weather"
ENV API_KEY ""
EXPOSE 80
CMD ["pm2-runtime","app.js"]