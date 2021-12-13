import axios from 'axios';

function fetchAllLusi() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/nft/lusi`).then((response) => response.data.data);
}

export default fetchAllLusi;
