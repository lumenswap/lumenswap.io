import axios from 'axios';

export function checkLusiDropped(address) {
  return axios.get(
    `${process.env.REACT_APP_LUMEN_API}/nft/airdrop/${address}`,
  );
}

export function claimLusiApi(address) {
  return axios.post(
    `${process.env.REACT_APP_LUMEN_API}/nft/airdrop/${address}/claim`,
  );
}

// export function getAssetHolderApi(asset) {
//   return axios.get(`https://api-holder.lumenswap.io/${asset}`).then((res) => res.data);
// }

export function getAccounts(assetCode, cursor) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/accounts`, {
    params: {
      limit: 200,
      order: 'desc',
      asset: `${assetCode}:${process.env.REACT_APP_LUSI_ISSUER}`,
      cursor,
    },
  });
}

export function fetchNFTActivity() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/nft/activity`);
}

const mockCollections = [
  {
    id: '40b5109e-e5b4-4944-b230-9601c0c43e07',
    name: 'Lusi collection',
    issuer: 'GCXSMVCOFOINEEETRTVVGGZRQTVMWT6JSLTR6DXBXZLNYGZSHFXI6V2V',
    ownerCount: '0',
    creator: 'lumenswap',
    description: 'lorem ipsum',
    bannerUrl: 'https://i.postimg.cc/yxRRpfVM/360-F-467930159-Ucfr-Okjh-FG436zo-T9f-Set-Ycc-Bgp-Nkokp.jpg',
    thumbnailUrl: 'https://i.postimg.cc/QCmcmMd7/group-2-3x.png',
    createdAt: '2022-07-24T09:17:10.425Z',
    updatedAt: '2022-07-24T09:17:10.425Z',
  },
  {
    id: '40b5109e-e5b4-4944-b230-9601c0c43e08',
    name: 'Lusi land',
    issuer: 'GCXSMVCOFOINEEETRTVVGGZRQTVMWT6JSLTR6DXBXZLNYGZSHFXI6V2V',
    ownerCount: '0',
    creator: 'lumenswap',
    description: 'lorem ipsum',
    bannerUrl: 'https://i.postimg.cc/yxRRpfVM/360-F-467930159-Ucfr-Okjh-FG436zo-T9f-Set-Ycc-Bgp-Nkokp.jpg',
    thumbnailUrl: 'https://i.postimg.cc/02c5RYbF/group-2-copy-3x.png',
    createdAt: '2022-07-24T09:17:10.425Z',
    updatedAt: '2022-07-24T09:17:10.425Z',
  },
];

export function getNFTCollections() {
  return new Promise((resolve) => { setTimeout(() => resolve(), 2000); })
    .then(() => mockCollections);
}
