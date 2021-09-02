const urlMaker = {
  root: () => '/',
  swap: {
    root: () => '/obm/swap',
    tokens: (tokenA, tokenB) => `/obm/swap/${tokenA}-${tokenB}`,
    custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
      const rootPath = '/obm/swap/';
      const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
      const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

      return `${rootPath}${partA}/${partB}`;
    },
  },
  spot: {
    root: () => '/obm/spot',
    tokens: (tokenA, tokenB) => `/obm/spot/${tokenA}-${tokenB}`,
    custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
      const rootPath = '/obm/spot/';
      const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
      const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

      return `${rootPath}${partA}/${partB}`;
    },
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
