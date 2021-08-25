import axios from 'axios';

export function getTopVolume(limit = 50) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/market/top-volume?limit=${limit}`);
}

export function getKnownAssets(limit = 200) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/market/known-assets?limit=${limit}`);
}
