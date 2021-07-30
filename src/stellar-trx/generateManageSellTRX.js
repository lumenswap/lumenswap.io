import BN from 'helpers/BN';
import isSameAsset from 'helpers/isSameAsset';
import StellarSDK from 'stellar-sdk';
import { initializeStore } from 'store';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateManageSellTRX(
  address,
  buyingAsset,
  sellingAsset,
  amount,
  price,
  offerId,
) {
  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: 100000,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  const store = initializeStore();
  const storeData = store.getState();
  if (!storeData.userBalance.find((i) => isSameAsset(i.asset, buyingAsset))) {
    transaction = transaction.addOperation(
      StellarSDK.Operation.changeTrust({
        asset: buyingAsset,
      }),
    );
  }
  if (!storeData.userBalance.find((i) => isSameAsset(i.asset, sellingAsset))) {
    transaction = transaction.addOperation(
      StellarSDK.Operation.changeTrust({
        asset: sellingAsset,
      }),
    );
  }

  transaction = transaction.addOperation(
    StellarSDK.Operation.manageSellOffer({
      selling: sellingAsset,
      buying: buyingAsset,
      amount: (new BN(amount)).toFixed(7),
      price: (new BN(price)).toFixed(7),
      offerId,
    }),
  )
    .setTimeout(30)
    .build();

  return transaction;
}
