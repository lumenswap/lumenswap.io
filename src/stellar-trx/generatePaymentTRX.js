import BN from 'helpers/BN';
import StellarSDK from 'stellar-sdk';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateManageSellTRX(
  address,
  amount,
  asset,
  destination,
  memo,
) {
  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: 100000,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  transaction = transaction.addOperation(
    StellarSDK.Operation.payment({
      destination,
      asset,
      amount: (new BN(amount)).toFixed(7),
    }),
  );

  if (memo) {
    transaction = transaction.addMemo(StellarSDK.Memo.text(memo));
  }

  transaction = transaction.setTimeout(30).build();

  return transaction;
}
