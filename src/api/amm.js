import axios from 'axios';

export function getKnownPools() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/amm/known-pools`).then((res) => res.data);
}

export function getAmmOverallPoolStats() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/amm/stats/overall`).then((res) => res.data);
}

export function getVolume24ForPool(poolId) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/amm/stats/${poolId}/volume-24h`).then((res) => res.data.volume);
}

export function getOneDayPoolStatsForPoolId(poolId) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/amm/stats/${poolId}`).then((res) => res.data);
}
