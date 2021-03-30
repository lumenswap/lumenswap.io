export default function balanceMapper(item) {
  return {
    asset: {
      code: item.asset_code,
      issuer: item.asset_issuer,
    },
    balance: item.balance,
  };
}
