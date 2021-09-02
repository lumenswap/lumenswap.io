import axios from 'axios';

export function fetchAddressRewardStats(address) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/reward/${address}/stats`);
}

export function fetchAddressReward(address) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/reward/${address}`);
}
