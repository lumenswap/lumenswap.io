import axios from 'axios';

async function getAssetFee(asset) {
  const response = await axios.get(`${process.env.REACT_APP_LUMEN_API}/bridge/fee-estimator/fee?asset=${asset.name}&network=${asset.network}`);
  return response.data;
}

export default getAssetFee;
