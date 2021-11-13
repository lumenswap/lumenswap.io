import axios from 'axios';

export function getKnownPools() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/amm/known-pools`).then((res) => res.data);
}
