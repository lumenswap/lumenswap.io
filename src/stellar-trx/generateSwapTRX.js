import StellarSDK from 'stellar-sdk';
import getAssetDetails from 'helpers/getAssetDetails';
import BN from 'helpers/BN';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateSwapTRX({ checkout, needToTrust }, forceTrust = false) {
  const calculatedMin = new BN(checkout.estimatedPrice)
    .times(new BN(1).minus(new BN(checkout.priceSpread).div(100)));

  const account = await server.loadAccount(checkout.fromAddress);
  const fee = await server.fetchBaseFee();

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  if (needToTrust || forceTrust) {
    transaction = transaction.addOperation(
      StellarSDK.Operation.changeTrust({
        asset: checkout.to.asset.details,
      }),
    );
  }

  const path = checkout.paths
    .map((i) => getAssetDetails({ issuer: i.asset_issuer, code: i.asset_code }));

  transaction = transaction
    .addOperation(
      StellarSDK.Operation.pathPaymentStrictSend({
        sendAsset: checkout.from.asset.details,
        sendAmount: new BN(checkout.from.amount).toFixed(7),
        destination: checkout.toAddress,
        destAsset: checkout.to.asset.details,
        destMin: calculatedMin.toFixed(7),
        path,
      }),
    )
    .setTimeout(30)
    .build();

  return transaction;
}
