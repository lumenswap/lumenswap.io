import { getAssetDetails } from 'helpers/asset';
import { getLiquidityPoolIdFromAssets, lexoOrderAssets } from 'helpers/stellarPool';
import StellarSDK from 'stellar-sdk';
import BN from 'helpers/BN';
import transactionConsts from './consts';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateWithdrawPoolTRX(
  address,
  assetA,
  assetB,
  amount,
  minAmountA,
  minAmountB,
  removeTrustline,
) {
  const poolId = getLiquidityPoolIdFromAssets(
    getAssetDetails(assetA),
    getAssetDetails(assetB),
  );

  const poolAsset = new StellarSDK.LiquidityPoolAsset(
    ...(lexoOrderAssets(getAssetDetails(assetA),
      getAssetDetails(assetB))),
    StellarSDK.LiquidityPoolFeeV18,
  );

  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: transactionConsts.FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  transaction.addOperation(
    StellarSDK.Operation.liquidityPoolWithdraw({
      liquidityPoolId: poolId,
      amount: new BN(amount).toFixed(7),
      minAmountA: new BN(minAmountA).toFixed(7),
      minAmountB: new BN(minAmountB).toFixed(7),
    }),
  );

  if (removeTrustline) {
    transaction.addOperation(
      StellarSDK.Operation.changeTrust({
        asset: poolAsset,
        limit: '0',
      }),
    );
  }

  transaction = transaction.setTimeout(transactionConsts.TIMEOUT).build();

  return transaction;
}
