import StellarSDK from 'stellar-sdk';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateManageBuyTRX(
  address,
  buyingAsset,
  sellingAsset,
  buyAmount,
  price,
  offerId,
) {
  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: 100000,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  transaction = transaction.addOperation(
    StellarSDK.Operation.manageBuyOffer({
      selling: sellingAsset,
      buying: buyingAsset,
      buyAmount,
      price,
      offerId,
    }),
  )
    .setTimeout(30)
    .build();

  return transaction;
}
