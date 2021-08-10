function delay(delayMilis) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMilis);
  });
}

export function fetchAddressReward(address) {
  return delay(1000).then(() => ({
    stats: {
      holderReward: 12,
      tradeReward: 1000,
      walletBalance: 1000,
    },
    lastActivity: [
      {
        tx: '12412',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
      {
        tx: '12412',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
      {
        tx: '12412',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
      {
        tx: '12412',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
    ],
  }));
}
