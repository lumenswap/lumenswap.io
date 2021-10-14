import getAssetDetails from './getAssetDetails';

export default function balanceMapper(item) {
  return {
    asset: getAssetDetails({
      code: item.asset_code,
      issuer: item.asset_issuer,
    }),
    balance: item.balance,
  };
}
