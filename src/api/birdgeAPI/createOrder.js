import axios from 'axios';

async function createOrderRequest(orderInfo) {
  const data = await axios.post(`${process.env.REACT_APP_LUMEN_API}/bridge/order`, orderInfo);
  return data;
}

export default createOrderRequest;
