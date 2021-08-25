FROM node:14.16.0-slim
WORKDIR /app
COPY . /app
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
ENV REACT_APP_HOST=https://app.lumenswap.io
ENV REACT_APP_LUMEN_API=https://api.lumenswap.io
RUN rm .eslintrc.js
RUN npm install
RUN npm run build
ENV PORT=8080
CMD ["npm", "run", "start"]
