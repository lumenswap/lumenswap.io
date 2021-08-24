import BN from 'helpers/BN';
import StellarSDK from 'stellar-sdk';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateBulkCancelOrderTRX(address, orders) {
  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: 100000,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  for (const order of orders) {
    transaction = transaction.addOperation(
      StellarSDK.Operation.manageSellOffer({
        selling: order.selling,
        buying: order.buying,
        amount: '0',
        price: (new BN(order.price)).toFixed(7),
        offerId: order.offerId,
      }),
    );
  }

  transaction = transaction
    .setTimeout(30)
    .build();

  return transaction;
}
