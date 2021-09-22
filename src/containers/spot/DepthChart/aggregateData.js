import BN from 'helpers/BN';

function calculateAmountAndTotal(isSell, i) {
  if (isSell) {
    return {
      innerAmount: new BN(i.amount),
      total: new BN(i.amount).times(i.price),
    };
  }

  return {
    innerAmount: new BN(i.amount).div(i.price).toFixed(7),
    total: new BN(i.amount),
  };
}

function calculateAmount(acc, amount, i) {
  let newAmount = amount;
  if (i > 0) {
    newAmount = amount.plus(acc[i - 1]);
  }
  return acc.concat(newAmount.toFixed(0));
}

export default (res) => {
  const mappedAsks = res.data.asks.map((ask) => ({
    ...ask,
    ...calculateAmountAndTotal(true, ask),
  }));
  const mappedBids = res.data.bids.map((bid) => ({
    ...bid,
    ...calculateAmountAndTotal(true, bid),
  }));
  const sortedMappedAsks = mappedAsks.sort((a, b) => 1 * new BN(a.price).comparedTo(b.price));
  const sortedMappedBids = mappedBids.sort((a, b) => -1 * new BN(a.price).comparedTo(b.price));

  const askPricesOnly = sortedMappedAsks.map((item) => item.price);
  const bidPricesOnly = sortedMappedBids.map((item) => item.price);

  const xAxisSteps = [...bidPricesOnly, ...askPricesOnly];

  const bids = sortedMappedBids.reduce((acc, cur, i) => {
    const amount = new BN(cur.amount).div(cur.price);
    return calculateAmount(acc, amount, i);
  }, []);

  const asks = sortedMappedAsks.reduce((acc, cur, i) => {
    const amount = new BN(cur.amount);
    return calculateAmount(acc, amount, i);
  }, []);

  return { xAxisSteps, bids: bids.reverse(), asks };
};
