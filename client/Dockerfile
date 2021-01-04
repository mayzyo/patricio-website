FROM node:12-alpine as build

WORKDIR /app

COPY ./package* /app

RUN npm install

COPY . /app

RUN npm run build:ssr

FROM node:12-alpine

WORKDIR /app

# Get all the code needed to run the app
COPY --from=build /app/dist/patricio-personal/* /app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["node", "./server/main.js"]