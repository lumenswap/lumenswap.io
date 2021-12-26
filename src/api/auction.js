import axios from 'axios';

export const getAllAuctions = async (query = {}) => {
  const response = await axios.get(`${process.env.REACT_APP_LUMEN_API}/auction`, { params: query });
  return response.data;
};

export const getAuctionById = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_LUMEN_API}/auction/${id}`);
  return response.data;
};

export const getAuctionBids = async (id, query = {}) => {
  const response = await axios.get(`${process.env.REACT_APP_LUMEN_API}/auction/${id}/bids`, { params: query });
  return response.data;
};

export const getAuctionWinners = async (id, query = {}) => {
  const response = await axios.get(`${process.env.REACT_APP_LUMEN_API}/auction/${id}/winner`, { params: query });
  return response.data;
};

export const getTotalBids = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_LUMEN_API}/auction/${id}/bids/total`);
  return response.data;
};

export const getAuctionStats = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_LUMEN_API}/auction/${id}/chart`);
  return response.data;
};
