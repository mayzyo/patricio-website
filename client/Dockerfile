FROM node:12-alpine AS build
WORKDIR /app
COPY ./package* /app/
RUN npm install
COPY . /app
RUN npm run build:ssr

FROM build AS test
WORKDIR /app
LABEL unittestlayer=true
RUN npm run test
RUN mkdir -p /out/testresults
RUN cp -r /app/coverage /out/testresults
RUN cp /app/junit.xml /out/testresults

FROM node:12-alpine AS final
WORKDIR /app
COPY --from=build /app/dist/patricio-personal/* /app/
EXPOSE 3000
CMD ["node", "./server/main.js"]