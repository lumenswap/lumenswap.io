FROM node:14.16.0-slim AS main
ENV PORT=8080

COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm ci
COPY . /app
RUN rm .eslintrc.js

FROM main as demo
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
ENV REACT_APP_HOST=https://app.lumenswap.io
ENV REACT_APP_LUMEN_API=https://api.lumenswap.io
ENV REACT_APP_ENV=production

RUN npm run build
CMD ["npm", "run", "start"]

FROM main as obm
RUN rm -r ./src/pages/reward
RUN rm -r ./src/pages/amm
RUN mv ./src/pages/obm/* ./src/pages
RUN rm -r ./src/pages/obm

ENV REACT_APP_MODE=OBM
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
ENV REACT_APP_HOST=https://obm.lumenswap.io
ENV REACT_APP_LUMEN_API=https://api.lumenswap.io
ENV REACT_APP_ENV=production

RUN npm run build
CMD ["npm", "run", "start"]

FROM main as reward
RUN rm -r ./src/pages/obm
RUN rm -r ./src/pages/amm
RUN mv ./src/pages/reward/* ./src/pages
RUN rm -r ./src/pages/reward

ENV REACT_APP_MODE=REWARD
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
ENV REACT_APP_HOST=https://reward.lumenswap.io
ENV REACT_APP_LUMEN_API=https://api.lumenswap.io
ENV REACT_APP_ENV=production

RUN npm run build
CMD ["npm", "run", "start"]

FROM main as amm
RUN rm -r ./src/pages/obm
RUN rm -r ./src/pages/reward
RUN mv ./src/pages/amm/* ./src/pages
RUN rm -r ./src/pages/amm

ENV REACT_APP_MODE=AMM
ENV REACT_APP_HORIZON=https://horizon.stellar.org
ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io
ENV REACT_APP_HOST=https://reward.lumenswap.io
ENV REACT_APP_LUMEN_API=https://api.lumenswap.io
ENV REACT_APP_ENV=production

RUN npm run build
CMD ["npm", "run", "start"]
