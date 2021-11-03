import StellarSDK from 'stellar-sdk';
import USDC from 'tokens/USDC';
import getAssetDetails from './getAssetDetails';
import getAssetFromLPAsset from './getCodeFromLPAsset';
import humanAmount from './humanAmount';
import BN from './BN';
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

export function getTVLInUSD(reserves, xlmPrice) {
  let balance = '-';
  const tokenA = getAssetFromLPAsset(reserves[0].asset);
  const tokenB = getAssetFromLPAsset(reserves[1].asset);

  if (isSameAsset(tokenA, getAssetDetails(USDC))) {
    balance = humanAmount(new BN(reserves[0].amount).times(2).toFixed(7), true);
  }

  if (isSameAsset(tokenB, getAssetDetails(USDC))) {
    balance = humanAmount(new BN(reserves[1].amount).times(2).toFixed(7), true);
  }

  if (tokenA.isNative()) {
    balance = humanAmount(
      new BN(reserves[0].amount).times(xlmPrice).times(2).toFixed(7),
      true,
    );
  }

  if (tokenB.isNative()) {
    balance = humanAmount(
      new BN(reserves[1].amount).times(xlmPrice).times(2).toFixed(7),
      true,
    );
  }

  return balance;
}
