import fakeDataChart from '../helpers/fakeDataChart';

const { data, date } = fakeDataChart;
const stats = {
  info: {
    volume24h: 200,
    volume7d: 1023400,
    total: 106,
  },
  chart: {
    data,
    date,
  },
};

function getStats() {
  return stats;
}

function fetchNFTStats() {
  return new Promise((reslove) => setTimeout(reslove, 1000)).then(() => getStats());
}

export default fetchNFTStats;
