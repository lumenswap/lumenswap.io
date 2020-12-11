import StellarSDK from 'stellar-sdk';
import store from 'src/store';
import getAssetDetails from 'src/helpers/getAssetDetails';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function getCreateManageBuyOfferTRX() {
  const { checkout, userToken } = store.getState();

  try {
    const account = await server.loadAccount(checkout.fromAddress);
    const fee = await server.fetchBaseFee();

    let needToTrust;
    if (checkout.toAsset.issuer === 'native') {
      needToTrust = false;
    } else {
      needToTrust = !userToken.find(
        (token) =>
          token.asset_code === checkout.toAsset.code &&
          token.asset_issuer === checkout.toAsset.issuer
      );
    }

    let transaction = new StellarSDK.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSDK.Networks.PUBLIC,
    });

    if (needToTrust) {
      transaction = transaction.addOperation(
        StellarSDK.Operation.changeTrust({
          asset: getAssetDetails(checkout.toAsset),
        })
      );
    }

    transaction = transaction
      .addOperation(
        StellarSDK.Operation.manageBuyOffer({
          selling: getAssetDetails(checkout.fromAsset),
          buying: getAssetDetails(checkout.toAsset),
          buyAmount: (
            checkout.fromAmount *
            checkout.counterPrice *
            (1 - checkout.tolerance)
          ).toFixed(7),
          price: {
            n: 1 * 10000000,
            d: Math.floor(
              (checkout.counterPrice * (1 - checkout.tolerance)).toFixed(7) *
                10000000
            ),
          },
          offerId: 0,
        })
      )
      .setTimeout(30)
      .build();

    return transaction;
  } catch (e) {
    return e;
  }
}
