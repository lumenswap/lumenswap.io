const urlMaker = {
  root: () => '/',
  swap: {
    root: () => '/swap',
    tokens: (tokenA, tokenB) => `/swap/${tokenA}-${tokenB}`,
    custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
      const rootPath = '/swap/';
      const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
      const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

      return `${rootPath}${partA}/${partB}`;
    },
  },
  spot: {
    root: () => '/spot',
    tokens: (tokenA, tokenB) => `/spot/${tokenA}-${tokenB}`,
    custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
      const rootPath = '/spot/';
      const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
      const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

      return `${rootPath}${partA}/${partB}`;
    },
  },
  market: {
    root: () => '/market',
  },
  reward: {
    root: () => '/reward',
  },
  wallet: {
    root: () => '/wallet',
  },
  order: {
    root: () => '/order',
  },
  pool: {
    root: () => '/pool',
  },
  stats: {
    root: () => '/stats',
  },
};

export default urlMaker;
