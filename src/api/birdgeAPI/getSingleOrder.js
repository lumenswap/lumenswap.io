import axios from 'axios';

async function getSingleOrder(orderId) {
  const { data } = await axios.get(`${process.env.REACT_APP_LUMEN_API}/bridge/order/${orderId}`);
  return data;
}

export default getSingleOrder;
