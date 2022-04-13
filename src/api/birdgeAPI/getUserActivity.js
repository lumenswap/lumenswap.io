import axios from 'axios';

async function getUserActivities(userAddress, query) {
  const { data } = await axios.get(`${process.env.REACT_APP_LUMEN_API}/bridge/${userAddress}/orders`, { params: query });
  return data;
}

export default getUserActivities;
