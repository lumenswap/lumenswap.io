FROM node:13.8.0-slim
WORKDIR /app
COPY . /app
ENV HORIZON=https://horizon.stellar.org
RUN npm ci
RUN npm run prod
CMD ["node", "server.js"]
