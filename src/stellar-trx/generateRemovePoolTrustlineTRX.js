import { getAssetDetails } from 'helpers/asset';
import { lexoOrderAssets } from 'helpers/stellarPool';
import StellarSDK from 'stellar-sdk';
import transactionConsts from './consts';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateRemovePoolTrustlineTRX(
  address,
  assetA,
  assetB,
) {
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
    StellarSDK.Operation.changeTrust({
      asset: poolAsset,
      limit: '0',
    }),
  );

  transaction = transaction.setTimeout(transactionConsts.TIMEOUT).build();

  return transaction;
}
