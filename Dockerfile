FROM node:13.8.0-slim
WORKDIR /app
COPY . /app
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_METRIC_SERVER=https://metricreporter.lumenswap.com
RUN npm ci
RUN npm run prod
CMD ["node", "server.js"]
