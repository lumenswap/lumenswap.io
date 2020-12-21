import StellarSDK from 'stellar-sdk';
import store from 'src/store';
import getAssetDetails from 'src/helpers/getAssetDetails';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function getSwapTRX(forceTrust = false) {
  const { checkout } = store.getState();

  try {
    const account = await server.loadAccount(checkout.fromAddress);
    const fee = await server.fetchBaseFee();

    let transaction = new StellarSDK.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSDK.Networks.PUBLIC,
    });

    const path = [];
    if (
      !getAssetDetails(checkout.fromAsset).isNative() &&
      !getAssetDetails(checkout.toAsset).isNative()
    ) {
      path.push(new StellarSDK.Asset.native()); // eslint-disable-line
    }

    transaction = transaction
      .addOperation(
        StellarSDK.Operation.pathPaymentStrictSend({
          sendAsset: getAssetDetails(checkout.fromAsset),
          sendAmount: checkout.fromAmount.toFixed(7),
          destination: checkout.toAddress,
          destAsset: getAssetDetails(checkout.toAsset),
          destMin: (
            checkout.fromAmount *
            checkout.counterPrice *
            (1 - checkout.tolerance)
          ).toFixed(7),
          path,
        })
      )
      .setTimeout(30)
      .build();

    return transaction;
  } catch (e) {
    return e;
  }
}
