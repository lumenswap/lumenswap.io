export default function purePairs(list) {
  const seen = {};

  return list.filter((item) => {
    const basePart = `${item.base.getAssetType()}_${item.base.getCode()}_${item.base.getIssuer()}`;
    const counterPart = `${item.counter.getAssetType()}_${item.counter.getCode()}_${item.counter.getIssuer()}`;
    const fullPart = `${basePart}_${counterPart}`;

    if (seen[fullPart]) {
      return false;
    }

    seen[fullPart] = true;
    return true;
  });
}
