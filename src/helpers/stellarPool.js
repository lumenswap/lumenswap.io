import StellarSDK from 'stellar-sdk';
import getAssetDetails from './getAssetDetails';
import isSameAsset from './isSameAsset';

export function lexoOrderAssets(A, B) {
  return (StellarSDK.Asset.compare(A, B) <= 0) ? [A, B] : [B, A];
}

export function getLiquidityPoolIdFromAssets(A, B) {
  const poolParams = new StellarSDK.LiquidityPoolAsset(...lexoOrderAssets(A, B),
    StellarSDK.LiquidityPoolFeeV18);

  return StellarSDK.getLiquidityPoolId(
    'constant_product',
    poolParams.getLiquidityPoolParameters(),
  ).toString('hex');
}

export function lexoOrderTokenWithDetails(A, B) {
  const [sortedA] = lexoOrderAssets(
    getAssetDetails(A),
    getAssetDetails(B),
  );

  if (isSameAsset(sortedA, getAssetDetails(A))) {
    return [A, B];
  }

  return [B, A];
}
