import BN from 'helpers/BN';

const DECIMAL_POINTS = 5;
const X_AXIS_LIMIT = 4;
const PRICE_PERCENT = 0.08;

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
    ...calculateAmountAndTotal(false, bid),
  }));
  const sortedMappedAsks = mappedAsks.sort(
    (a, b) => 1 * new BN(a.price).comparedTo(b.price),
  );
  const sortedMappedBids = mappedBids.sort(
    (a, b) => -1 * new BN(a.price).comparedTo(b.price),
  );

  const askPricesOnly = sortedMappedAsks.map((item) => item.price);
  const bidPricesOnly = sortedMappedBids.map((item) => item.price);

  const askPrice = +askPricesOnly[0];
  const bidPrice = +bidPricesOnly[0];
  const price = new BN(askPrice).plus(bidPrice).div(2).toFixed(DECIMAL_POINTS);

  const xStep = new BN(price).multipliedBy(PRICE_PERCENT);
  const greenXAxis = Array.from({ length: X_AXIS_LIMIT })
    .map((item, i) => new BN(price).minus(new BN(i).multipliedBy(xStep)).toFixed(DECIMAL_POINTS))
    .reverse();
  const redXAxis = Array.from({ length: X_AXIS_LIMIT })
    .map((item, i) => new BN(price).plus(new BN(i).multipliedBy(xStep)).toFixed(DECIMAL_POINTS));

  const xAxisSteps = [...bidPricesOnly.reverse(), ...askPricesOnly].filter(
    (value) => new BN(value).gte(greenXAxis[0])
      && new BN(value).lte(redXAxis[redXAxis.length - 1]),
  ).map((item) => new BN(item).toFixed(3));

  const bids = sortedMappedBids.reduce((acc, cur, i) => {
    if (
      new BN(cur.price).lt(greenXAxis[0])
      || new BN(cur.price).gt(redXAxis[redXAxis.length - 1])
    ) {
      return acc;
    }
    const amount = new BN(cur.amount).div(cur.price);
    return calculateAmount(acc, amount, i);
  }, []);

  const asks = sortedMappedAsks.reduce((acc, cur, i) => {
    if (
      new BN(cur.price).lt(greenXAxis[0])
      || new BN(cur.price).gt(redXAxis[redXAxis.length - 1])
    ) {
      return acc;
    }
    const amount = new BN(cur.amount);
    return calculateAmount(acc, amount, i);
  }, []);

  return { xAxisSteps, bids: bids.reverse(), asks };
};
