import getAssetDetails from 'helpers/getAssetDetails';
import { getLiquidityPoolIdFromAssets, lexoOrderAssets } from 'helpers/stellarPool';
import StellarSDK from 'stellar-sdk';
import BN from 'helpers/BN';
import transactionConsts from './consts';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateDepositPoolTRX(
  address,
  assetA,
  assetB,
  assetAAmount,
  assetBAmount,
  maxPrice,
  minPrice,
) {
  const poolId = getLiquidityPoolIdFromAssets(
    getAssetDetails(assetA),
    getAssetDetails(assetB),
  );

  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: transactionConsts.FEE,
    networkPassphrase: StellarSDK.Networks.TESTNET,
    withMuxing: true,
  });

  const poolAsset = new StellarSDK.LiquidityPoolAsset(
    ...(lexoOrderAssets(getAssetDetails(assetA),
      getAssetDetails(assetB))),
    StellarSDK.LiquidityPoolFeeV18,
  );

  console.log({
    liquidityPoolId: poolId,
    maxAmountA: new BN(assetAAmount).toFixed(7),
    maxAmountB: new BN(assetBAmount).toFixed(7),
    minPrice: new BN(minPrice).toFixed(7),
    maxPrice: new BN(maxPrice).toFixed(7),
  });

  transaction.addOperation(
    StellarSDK.Operation.changeTrust({
      asset: poolAsset,
    }),
  ).addOperation(
    StellarSDK.Operation.liquidityPoolDeposit({
      liquidityPoolId: poolId,
      maxAmountA: new BN(assetAAmount).toFixed(7),
      maxAmountB: new BN(assetBAmount).toFixed(7),
      minPrice: new BN(minPrice).toFixed(7),
      maxPrice: new BN(maxPrice).toFixed(7),
    }),
  );

  transaction = transaction.setTimeout(transactionConsts.TIMEOUT).build();

  return transaction;
}
