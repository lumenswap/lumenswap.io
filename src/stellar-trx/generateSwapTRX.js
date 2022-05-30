import StellarSDK from 'stellar-sdk';
import { getAssetDetails } from 'helpers/asset';
import BN from 'helpers/BN';
import transactionConsts from './consts';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateSwapTRX({ checkout, needToTrust }, forceTrust = false) {
  const calculatedMin = new BN(checkout.estimatedPrice)
    .times(new BN(1).minus(new BN(checkout.priceSpread).div(100)));

  const account = await server.loadAccount(checkout.fromAddress);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: transactionConsts.FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  const toAssetDetail = getAssetDetails(checkout.to.asset.details);

  if ((needToTrust) && !toAssetDetail.isNative()) {
    transaction = transaction.addOperation(
      StellarSDK.Operation.changeTrust({
        asset: toAssetDetail,
      }),
    );
  }

  const path = checkout.paths
    .map((i) => getAssetDetails({ issuer: i.asset_issuer, code: i.asset_code }));

  transaction = transaction
    .addOperation(
      StellarSDK.Operation.pathPaymentStrictSend({
        sendAsset: getAssetDetails(checkout.from.asset.details),
        sendAmount: new BN(checkout.from.amount).toFixed(7),
        destination: checkout.toAddress,
        destAsset: getAssetDetails(checkout.to.asset.details),
        destMin: calculatedMin.toFixed(7),
        path,
      }),
    )
    .setTimeout(transactionConsts.TIMEOUT)
    .build();

  return transaction;
}
