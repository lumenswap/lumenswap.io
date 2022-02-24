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
