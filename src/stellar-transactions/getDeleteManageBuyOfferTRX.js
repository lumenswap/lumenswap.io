import StellarSDK from 'stellar-sdk';
import store from 'src/store';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function getDeleteManageBuyOfferTRX(offer) {
  const { user } = store.getState();

  try {
    const account = await server.loadAccount(user.detail.publicKey);
    const fee = await server.fetchBaseFee();

    const transaction = new StellarSDK.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSDK.Networks.PUBLIC,
    })
      .addOperation(
        StellarSDK.Operation.manageBuyOffer({
          selling:
            offer.selling.asset_type === 'native'
              ? new StellarSDK.Asset.native() // eslint-disable-line
              : new StellarSDK.Asset(
                  offer.selling.asset_code,
                  offer.selling.asset_issuer
                ),
          buying:
            offer.buying.asset_type === 'native'
              ? new StellarSDK.Asset.native() // eslint-disable-line
              : new StellarSDK.Asset(
                  offer.buying.asset_code,
                  offer.buying.asset_issuer
                ),
          buyAmount: '0',
          price: offer.price_r,
          offerId: offer.id,
        })
      )
      .setTimeout(30)
      .build();

    return transaction;
  } catch (e) {
    return e;
  }
}
