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

const mockCollectionNfts = [
  {
    id: '58437cb8-824d-42bf-91d2-eca5547e4d41',
    name: null,
    collectionId: '40b5109e-e5b4-4944-b230-9601c0c43e07',
    price: '0',
    assetCode: 'Lusi9',
    imageUrl: 'https://cdn.lumenswap.io/lusi/9.png',
    ipfHash: 'QmNp6YtAeDTRxpugxwv6AcBWu3mmDB7nRhVky8HvKajJXe',
    number: 9,
    createdAt: '2021-11-22T20:02:17.637Z',
    updatedAt: '2022-06-12T09:28:44.228Z',
  },
  {
    id: 'da510fd2-5bc6-4723-807c-f08bbd108cfc',
    name: null,
    collectionId: '40b5109e-e5b4-4944-b230-9601c0c43e07',
    price: '220000',
    assetCode: 'Lusi11',
    imageUrl: 'https://cdn.lumenswap.io/lusi/11.png',
    ipfHash: 'Qmcas1buHHVRvURJfLHiwzEW9X5n5H8nbVLKKLMapbB6V1',
    number: 11,
    createdAt: '2021-11-22T20:02:17.637Z',
    updatedAt: '2022-06-12T09:28:44.295Z',
  },
  {
    id: '50e738b3-a62b-4430-a6ea-f07fa2aca0d6',
    name: null,
    collectionId: '40b5109e-e5b4-4944-b230-9601c0c43e07',
    price: '1000000000',
    assetCode: 'Lusi96',
    imageUrl: 'https://cdn.lumenswap.io/lusi/96.png',
    ipfHash: 'QmQrByb7FpA4DySPKitnZQG7UfkDQAZoHbrmR1CPXT21yF',
    number: 96,
    createdAt: '2021-11-22T20:02:17.638Z',
    updatedAt: '2022-06-12T09:28:13.987Z',
  },
];

const mockCollectionStats = {
  floorPrice: 0,
  owners: '0',
  totalVolume: 1976171,
  totalNfts: 108,
};

export function getNFTCollections() {
  return new Promise((resolve) => { setTimeout(() => resolve(), 2000); })
    .then(() => mockCollections);
}

export function getCollectionNfts(collectionId) {
  return new Promise((resolve) => { setTimeout(() => resolve(), 2000); })
    .then(() => mockCollectionNfts);
}

export function getCollectionStats(collectionId) {
  return new Promise((resolve) => { setTimeout(() => resolve(), 1000); })
    .then(() => mockCollectionStats);
}

export function getSingleCollection(collectionId) {
  return new Promise((resolve) => { setTimeout(() => resolve(), 1000); })
    .then(() => mockCollections[0]);
}
