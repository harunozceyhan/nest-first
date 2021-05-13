FROM  node:12.14-slim
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
RUN npm i -g typeorm
COPY . .
EXPOSE 3000
CMD ["sh", "-c", " typeorm migration:run; npm run start:prod"]