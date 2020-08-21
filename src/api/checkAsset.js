export default function checkAsset(assetCode, assetIssuer) {
  return global
    .fetch(
      `${process.env.REACT_APP_HORIZON}/assets?asset_code=${assetCode}&asset_issuer=${assetIssuer}`
    )
    .then((res) => {
      if (res.ok) {
        return true;
      }

      return false;
    })
    .catch(() => false);
}
