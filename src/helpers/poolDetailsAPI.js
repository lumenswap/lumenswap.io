const api = {
  info: {
    tvl1: '10',
    tvl2: '100',
    trustline: '18373',
    share: '106',
  },
  swaps: [
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    }, {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },
    {
      tx: 'Gi9nf8iTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sTnd5sk5Tnd5s3',
      info: 100,
      time: 1633200832201,
    },

  ],
};

function getPoolDetails() {
  return api;
}

function fetchPoolDetails(userAdress) {
  return new Promise((reslove) => setTimeout(reslove, 3000)).then(() => getPoolDetails());
}

export default fetchPoolDetails;
