import axios from 'axios';

function getBridgeTokens() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/bridge/asset`).then((response) => response.data);
}

export default getBridgeTokens;
