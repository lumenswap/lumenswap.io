import BN from 'helpers/BN';
import { getAssetDetails } from 'helpers/asset';

export default function balanceMapper(item) {
  const balance = new BN(item.balance)
    .minus(item.selling_liabilities)
    .toFixed(7);

  return {
    asset: getAssetDetails({
      code: item.asset_code,
      issuer: item.asset_issuer,
    }),
    balance,
    rawBalance: item.balance,
  };
}

export function filterUserBalance(userBalance) {
  return userBalance.filter((item) => getAssetDetails({
    code: item.asset_code,
    issuer: item.asset_issuer,
    type: item.asset_type,
  }) !== null).map(balanceMapper);
}
