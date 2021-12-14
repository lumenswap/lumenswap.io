const chartData = [820, 932, 901, 934, 1290, 1330, 1320];

const infoData = {
  asset: {
    code: 'RBT',
    issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    sellAmount: 1000000,
  },
  auction: {
    startDate: '2021-10-14T00:00:00.000Z',
    endDate: '2021-10-16T08:08:41.693Z',
    startLedger: 37853152,
    endLedger: 379222525,
    basePrice: 0.3,
    baseAssetCode: 'XLM',
    bids: 12000,
  },
  bidAsset: {
    code: 'RBT',
    issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
  },
};

export function fetchAuctionChartData() {
  return new Promise((reslove) => setTimeout(reslove, 1000)).then(() => chartData);
}

export function fetchAuctionInfoData() {
  return new Promise((reslove) => setTimeout(reslove, 0)).then(() => infoData);
}
