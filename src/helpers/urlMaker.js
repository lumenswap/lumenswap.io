const urlMaker = {
  root: () => '/',
  swap: {
    root: () => '/obm/swap',
    tokens: (tokenA, tokenB) => `/obm/swap/${tokenA}-${tokenB}`,
    custom: (assetA, assetB) => `/obm/swap/${assetA.code}${
      assetA.isDefault ? '' : `-${assetA.issuer}`
    }/${assetB.code}${assetB.isDefault ? '' : `-${assetB.issuer}`}`,
  },
  spot: {
    root: () => '/obm/spot',
    tokens: (tokenA, tokenB) => `/obm/spot/${tokenA}-${tokenB}`,
    custom: (assetA, assetB) => `/obm/spot/${assetA.code}${
      assetA.isDefault ? '' : `-${assetA.issuer}`
    }/${assetB.code}${assetB.isDefault ? '' : `-${assetB.issuer}`}`,
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
