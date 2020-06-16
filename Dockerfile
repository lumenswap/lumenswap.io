FROM node:13.8.0-slim
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run prod
CMD ["node", "server.js"]
