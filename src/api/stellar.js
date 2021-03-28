import axios from 'axios';

export function getSendEstimatedValueAPI(params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/paths/strict-send`, { params }).then((res) => res.data._embedded.records[0]);
}

export function getReceiveEstimatedValueAPI(params) {
  return axios.get(`${process.env.REACT_APP_HORIZON}/paths/strict-receive`, { params }).then((res) => res.data._embedded.records[0]);
}
