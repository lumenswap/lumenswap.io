FROM node:14.16.0-slim AS main
WORKDIR /app
COPY . /app
ENV PORT=8080
RUN rm .eslintrc.js
RUN npm ci

FROM main as obm
RUN rm -r ./src/pages/reward
RUN mv ./src/pages/obm/* ./src/pages
RUN rm -r ./src/pages/obm

ENV REACT_APP_MODE=OBM
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
ENV REACT_APP_HOST=https://app.lumenswap.io
ENV REACT_APP_LUMEN_API=https://api.lumenswap.io
ENV REACT_APP_ENV=production

RUN npm run build
CMD ["npm", "run", "start"]

FROM main as reward
RUN rm -r ./src/pages/obm
RUN mv ./src/pages/reward/* ./src/pages
RUN rm -r ./src/pages/reward

ENV REACT_APP_MODE=REWARD
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
ENV REACT_APP_HOST=https://app.lumenswap.io
ENV REACT_APP_LUMEN_API=https://api.lumenswap.io
ENV REACT_APP_ENV=production

RUN npm run build
CMD ["npm", "run", "start"]
