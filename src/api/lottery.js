import axios from 'axios';

export function getAllRounds() {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/round`);
}

export function getRoundParticipants(roundNumber, query) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/round/${roundNumber}/participants`, { params: { ...query } });
}

export function getSingleRound(number) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/round/${number}`);
}

export function getMyTickets(address, roundNumber, page = 1, limit = 10) {
  return axios.get(`${process.env.REACT_APP_LUMEN_API}/lottery/ticket`, {
    params: {
      page, address, round: roundNumber, limit,
    },
  });
}

export function searchTikcets(query) {
  return axios
    .get(`${process.env.REACT_APP_LUMEN_API}/lottery/ticket`,
      {
        params: query,
      });
}
