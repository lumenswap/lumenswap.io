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

export function getAssetHolderApi(asset) {
  return axios.get(`https://api-holder.lumenswap.io/${asset}`).then((res) => res.data);
}
