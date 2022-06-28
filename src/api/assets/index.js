import axios from 'axios';

export async function getDefaultAssets() {
  const assets = await axios.get(`${process.env.TOKENS_SERVER_URL}/asset`);
  return assets.data;
}
