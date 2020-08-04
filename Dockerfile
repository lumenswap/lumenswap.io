FROM node:13.8.0-slim
WORKDIR /app
COPY . /app
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_METRIC_SERVER=https://metricreporter.lumenswap.com
RUN npm ci
RUN npm i serve
RUN npm run build
ENV PORT=8080
CMD ["node", "server.js"]
