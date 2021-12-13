import axios from 'axios';

async function fetchNFTStats() {
  const info = await axios.get(`${process.env.REACT_APP_LUMEN_API}/nft/stats/overall`);
  const chart = await axios.get(`${process.env.REACT_APP_LUMEN_API}/nft/stats/aggregation`);

  return {
    info: info.data,
    chart: chart.data,
  };
}

export default fetchNFTStats;
