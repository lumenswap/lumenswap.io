const urlMaker = {
  root: () => '/',
  swap: {
    root: () => '/obm/swap',
    tokens: (tokenA, tokenB) => `/obm/swap/${tokenA}-${tokenB}`,
    custom: () => '/obm/swap/custom',
  },
  spot: {
    root: () => '/obm/spot',
    tokens: (tokenA, tokenB) => `/obm/spot/${tokenA}-${tokenB}`,
    custom: () => '/obm/spot/custom',
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
