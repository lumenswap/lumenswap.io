import axios from 'axios';

export async function getDefaultAssets() {
  const assets = await axios.get(`${process.env.REACT_APP_LUMEN_API}/asset`);
  return assets.data;
}

export async function getAssetPairs() {
  const assetPairs = await axios.get(`${process.env.REACT_APP_LUMEN_API}/asset/pairs`);
  return assetPairs.data;
}
