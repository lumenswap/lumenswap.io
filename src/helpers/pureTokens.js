export default function pureTokens(list) {
  const seen = {};

  return list.filter((item) => {
    if (seen[`${item.getAssetType()}_${item.getCode()}_${item.getIssuer()}`]) {
      return false;
    }

    seen[`${item.getAssetType()}_${item.getCode()}_${item.getIssuer()}`] = true;
    return true;
  });
}
