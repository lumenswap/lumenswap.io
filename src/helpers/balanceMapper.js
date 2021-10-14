import getAssetDetails from './getAssetDetails';

export default function balanceMapper(item) {
  console.log(getAssetDetails({
    code: item.asset_code,
    issuer: item.asset_issuer,
  }).getCode(), item.balance);
  return {
    asset: getAssetDetails({
      code: item.asset_code,
      issuer: item.asset_issuer,
    }),
    balance: item.balance,
  };
}
