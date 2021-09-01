const urlMaker = {
  root: () => '/',
  swap: {
    root: () => '/obm/swap',
    tokens: (tokenA, tokenB) => `/obm/swap/${tokenA}-${tokenB}`,
    custom: (assetA, assetB) => `/obm/swap/${assetA.code}${
      !assetA.issuer ? '' : `-${assetA.issuer}`
    }/${assetB.code}${!assetB.issuer ? '' : `-${assetB.issuer}`}`,
    hard: (url) => `/obm/swap/${url}`,
  },
  spot: {
    root: () => '/obm/spot',
    tokens: (tokenA, tokenB) => `/obm/spot/${tokenA}-${tokenB}`,
    custom: (assetA, assetB) => `/obm/spot/${assetA.code}${
      !assetA.issuer ? '' : `-${assetA.issuer}`
    }/${assetB.code}${!assetB.issuer ? '' : `-${assetB.issuer}`}`,
    hard: (url) => `/obm/spot/${url}`,
  },
  market: {
    root: () => '/obm/market',
  },
  reward: {
    root: () => '/reward',
  },
  wallet: {
    root: () => '/obm/wallet',
  },
  order: {
    root: () => '/obm/order',
  },
};

export default urlMaker;
