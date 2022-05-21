import BN from 'helpers/BN';

export function calculateFromAmount(orderInfo) {
  const minPrecision = Math.min(orderInfo.from_asset.precision, orderInfo.to_asset.precision);
  return new BN(orderInfo.user_amount).div(10 ** minPrecision).toString();
}

export function calculateToAmount(orderInfo) {
  const minPrecision = Math.min(orderInfo.from_asset.precision, orderInfo.to_asset.precision);
  let feeMinPrecision = orderInfo.from_asset.precision;
  if (orderInfo.from_asset.network.toLowerCase() === 'stellar') {
    feeMinPrecision = orderInfo.to_asset.precision;
  }
  const totalFee = new BN(orderInfo.fee.total).div(10 ** feeMinPrecision);
  return new BN(orderInfo.user_amount).div(10 ** minPrecision).minus(totalFee).toString();
}

export function calculateToAmountFee(fee, precision) {
  const totalFee = new BN(fee).div(10 ** precision);
  return totalFee;
}
