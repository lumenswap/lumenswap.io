import axios from 'axios';

export function getAllLiquidityPool(params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/liquidity_pools`, { params })
    .then((res) => res.data._embedded.records);
}

export function getPoolDetailsById(poolId) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/liquidity_pools/${poolId}`)
    .then((res) => res.data);
}
