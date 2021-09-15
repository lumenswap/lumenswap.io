import BN from 'helpers/BN';
import StellarSDK from 'stellar-sdk';
import transactionConsts from './consts';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateCreateAccountTRX(
  address,
  amount,
  destination,
  memo,
) {
  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: transactionConsts.FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  transaction = transaction.addOperation(
    StellarSDK.Operation.createAccount({
      destination,
      startingBalance: (new BN(amount)).toFixed(7),
    }),
  );

  if (memo) {
    transaction = transaction.addMemo(StellarSDK.Memo.text(memo));
  }

  transaction = transaction.setTimeout(transactionConsts.TIMEOUT).build();

  return transaction;
}
