import axios from 'axios';

export function getAllRounds() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/round`);
}

export function getAllRoundTickets(roundNumber) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/round/${roundNumber}/tickets`);
}

export function getRoundParticipants(roundNumber) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/round/${roundNumber}/participants`);
}

export function getSingleRound(number) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/round/${number}`);
}

export function getMyTickets(address, roundNumber, page = 1) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/ticket/user`, { params: { page, address, round: roundNumber } });
}
