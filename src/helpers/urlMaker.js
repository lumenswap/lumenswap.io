const rootUrl = {
  obm: '/obm',
  reward: '/reward',
  amm: '/amm',
  lottery: '/lottery',
  nft: '/nft',
};

if (process.env.REACT_APP_MODE === 'OBM') {
  rootUrl.obm = '';
} else if (process.env.REACT_APP_MODE === 'REWARD') {
  rootUrl.reward = '';
} else if (process.env.REACT_APP_MODE === 'AMM') {
  rootUrl.amm = '';
} else if (process.env.REACT_APP_MODE === 'LOTTERY') {
  rootUrl.lottery = '';
} else if (process.env.REACT_APP_MODE === 'NFT') {
  rootUrl.nft = '';
}

const urlMaker = {
  root: () => '/',
  swap: {
    root: () => `${rootUrl.obm}/swap`,
    tokens: (tokenA, tokenB) => `${rootUrl.obm}/swap/${tokenA}-${tokenB}`,
    custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
      const rootPath = `${rootUrl.obm}/swap/`;
      const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
      const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

      return `${rootPath}${partA}/${partB}`;
    },
  },
  ammswap: {
    root: () => `${rootUrl.amm}/swap`,
    tokens: (tokenA, tokenB) => `${rootUrl.amm}/swap/${tokenA}-${tokenB}`,
    custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
      const rootPath = `${rootUrl.amm}/swap/`;
      const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
      const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

      return `${rootPath}${partA}/${partB}`;
    },
  },
  spot: {
    root: () => `${rootUrl.obm}/spot`,
    tokens: (tokenA, tokenB) => `${rootUrl.obm}/spot/${tokenA}-${tokenB}`,
    custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
      const rootPath = `${rootUrl.obm}/spot/`;
      const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
      const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

      return `${rootPath}${partA}/${partB}`;
    },
  },
  market: {
    root: () => `${rootUrl.obm}/market`,
  },
  reward: {
    root: () => `${rootUrl.reward}/`,
  },
  wallet: {
    root: () => `${rootUrl.obm}/wallet`,
  },
  ammwallet: {
    root: () => `${rootUrl.amm}/wallet`,
  },
  order: {
    root: () => `${rootUrl.obm}/order`,
  },
  pool: {
    root: () => `${rootUrl.amm}/pools`,
    poolId: (id) => `${rootUrl.amm}/pool/${id}`,
  },
  stats: {
    root: () => `${rootUrl.amm}/stats`,
    tokens: (tokenA, tokenB) => `${rootUrl.amm}/stats/${tokenA}/${tokenB}`,
  },
  myPool: {
    root: () => `${rootUrl.amm}/my-pool`,
    myPoolId: (id) => `${rootUrl.amm}/my-pool/${id}`,
  },
  lottery: {
    root: () => `${rootUrl.lottery === '' ? '/' : rootUrl.lottery}`,
    singleRound: (round) => `${rootUrl.lottery}/round/${round}`,
    tickets: () => `${rootUrl.lottery}/tickets`,
    learn: () => `${rootUrl.lottery}/learnmore`,
    allTickets: (round) => `${rootUrl.lottery}/round/${round}/tickets`,
    allParticipants: (round) => `${rootUrl.lottery}/round/${round}/participants`,
  },
  nft: {
    root: () => `${rootUrl.nft}`,
    orders: () => `${rootUrl.nft}/orders`,
    stats: () => `${rootUrl.nft}/stats`,
    myLusi: () => `${rootUrl.nft}/my-lusi`,
    lusi: (number) => `${rootUrl.nft}/lusi/${number}`,
    lusiTrades: (number) => `${rootUrl.nft}/lusi/${number}/trades`,
    lusiOffers: (number) => `${rootUrl.nft}/lusi/${number}/offers`,
  },
};

export default urlMaker;
