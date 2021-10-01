import getAssetDetails from './getAssetDetails';

const api = [
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
    volumePerDay: 12,
    volumePerWeek: 13,
  },
];

function getStats() {
  return api;
}
async function fetchStats(userAdress) {
  return new Promise((reslove) => setTimeout(reslove, 3000)).then(() => getStats());
}

export default fetchStats;
