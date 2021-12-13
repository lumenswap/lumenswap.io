const rootUrl = {
  obm: '/obm',
  reward: '/reward',
  amm: '/amm',
  lottery: '/lottery',
  nft: '/nft',
  auction: '/auction',
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
  obm: {
    swap: {
      root: () => `${rootUrl.obm}/swap`,
      custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
        const rootPath = `${urlMaker.obm.swap.root()}/`;
        const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
        const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

        return `${rootPath}${partA}/${partB}`;
      },
    },
    spot: {
      root: () => `${rootUrl.obm}/spot`,
      custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
        const rootPath = `${urlMaker.obm.spot.root()}/`;
        const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
        const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

        return `${rootPath}${partA}/${partB}`;
      },
    },
    market: {
      root: () => `${rootUrl.obm}/market`,
    },
    wallet: {
      root: () => `${rootUrl.obm}/wallet`,
    },
    order: {
      root: () => `${rootUrl.obm}/order`,
    },
  },

  amm: {
    swap: {
      root: () => `${rootUrl.amm}/swap`,
      custom: (assetACode, assetAIssuer, assetBCode, assetBIssuer) => {
        const rootPath = `${urlMaker.amm.swap.root()}/`;
        const partA = `${[assetACode, assetAIssuer].filter((i) => i).join('-')}`;
        const partB = `${[assetBCode, assetBIssuer].filter((i) => i).join('-')}`;

        return `${rootPath}${partA}/${partB}`;
      },
    },
    wallet: {
      root: () => `${rootUrl.amm}/wallet`,
    },

    pool: {
      root: () => `${rootUrl.amm}/pools`,
      poolId: (id) => `${rootUrl.amm}/pool/${id}`,
    },
    myPool: {
      root: () => `${rootUrl.amm}/my-pool`,
      detail: (id) => `${urlMaker.amm.myPool.root()}/${id}`,
    },

  },

  reward: {
    root: () => `${rootUrl.reward}/`,
  },

  lottery: {
    root: () => `${rootUrl.lottery === '' ? '/' : rootUrl.lottery}`,
    tickets: () => `${rootUrl.lottery}/tickets`,
    round: {
      root: (round) => `${rootUrl.lottery}/round/${round}`,
      tickets: (round) => `${urlMaker.lottery.round.root(round)}/tickets`,
      participants: (round) => `${urlMaker.lottery.round.root(round)}/participants`,
    },
  },
  nft: {
    root: () => `${rootUrl.nft}/`,
    orders: () => `${rootUrl.nft}/offers`,
    stats: () => `${rootUrl.nft}/stats`,
    myLusi: () => `${rootUrl.nft}/my-lusi`,
    lusi: {
      root: (number) => `${rootUrl.nft}/lusi/${number}`,
      trades: (number) => `${urlMaker.nft.lusi.root(number)}/trades`,
      offers: (number) => `${urlMaker.nft.lusi.root(number)}/offers`,
    },
  },
  auction: {
    root: () => `${rootUrl.auction}/board`,
    singleBoard: (name) => `${rootUrl.auction}/board/${name}`,
    tickets: () => `${rootUrl.auction}/tickets`,
    bids: (name) => `${rootUrl.auction}/board/${name}/bids`,
    winners: (name) => `${rootUrl.auction}/board/${name}/winners`,
  },
};

export default urlMaker;
