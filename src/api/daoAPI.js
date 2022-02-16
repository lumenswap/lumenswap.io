import axios from 'axios';

export const getGovernances = async (query) => {
  const { data } = await axios.get(`${process.env.REACT_APP_LUMEN_API}/dao`, { params: query });
  return data;
};
export const getGovernanceProposals = async (governanceId, query) => {
  const { data } = await axios.get(`${process.env.REACT_APP_LUMEN_API}/dao/governance/${governanceId}/proposals`, { params: query });
  return data;
};

export const getSingleProposal = async (proposalId) => {
  const { data } = await axios.get(`${process.env.REACT_APP_LUMEN_API}/dao/proposal/${proposalId}`);
  return data;
};

export const getVotesForProposal = async (proposalId, query) => {
  const { data } = await axios.get(`${process.env.REACT_APP_LUMEN_API}/dao/proposal/${proposalId}/votes`, { params: query });
  return data;
};

export const createPendingProposal = async (proposal) => {
  const { data } = await axios.post(`${process.env.REACT_APP_LUMEN_API}/dao/pending-proposal`, proposal);
  return data;
};

export const getAddressActivity = async (address, query) => {
  const { data } = await axios.get(`${process.env.REACT_APP_LUMEN_API}/dao/${address}/activities`, { params: query });
  return data;
};
