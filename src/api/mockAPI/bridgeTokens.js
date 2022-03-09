import btcLogo from 'assets/images/btc-logo.png';
import LSP from 'tokens/LSP';
import RBT from 'tokens/RBT';

export const bridgeMockTokens = [
  {
    code: LSP.code,
    logo: LSP.logo,
    web: LSP.web,
    type: 'default',
    network: 'Stellar',
  },
  {
    code: RBT.code,
    logo: RBT.logo,
    web: RBT.web,
    type: 'default',
    network: 'Stellar',
  },
  {
    code: 'LBNB',
    web: 'bnb.net',
    type: 'l-asset',
    network: 'Binance',
  },
  {
    code: 'ETH',
    web: 'ethereum.org',
    type: 'default',
    network: 'Ethereum',
  },
  {
    code: 'BTC',
    logo: btcLogo,
    type: 'default',
    web: 'bitcoin.org',
    network: 'Bitcoin',
  },
];

export function getAllBridgeTokens(query) {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    if (query?.searchQuery) {
      return bridgeMockTokens.filter((token) => token.code.toLowerCase()
        .search(query.searchQuery) !== -1);
    }
    return bridgeMockTokens;
  });
}

export function getBridgeDefaultSelectedTokens() {
  return new Promise((resolve) => setTimeout(resolve, 1000))
    .then(() => ({ tokenA: bridgeMockTokens[0], tokenB: bridgeMockTokens[3] }));
}

// export const bridgeMockTokens = [
//   {
//     code: 'ETH',
//     web: 'ethereum.org',
//     type: 'default',
//   },
//   {
//     code: 'BTC',
//     logo: btcLogo,
//     type: 'default',
//   },
// ];
