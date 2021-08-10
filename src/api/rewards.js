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
        tx: 'da98db614bf608d8a3f91d02db6008c80c219e1666968e25a52d1118545ba0db',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
      {
        tx: 'da98db614bf608d8a3f91d02db6008c80c219e1666968e25a52d1118545ba0db',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
      {
        tx: 'da98db614bf608d8a3f91d02db6008c80c219e1666968e25a52d1118545ba0db',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
      {
        tx: 'da98db614bf608d8a3f91d02db6008c80c219e1666968e25a52d1118545ba0db',
        date: Date.now() - 1214214,
        type: 'Holder',
        amount: 214124214,
      },
    ],
  }));
}
