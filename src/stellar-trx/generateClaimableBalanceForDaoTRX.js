import BN from 'helpers/BN';
import StellarSDK from 'stellar-sdk';
import transactionConsts from './consts';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function generateClaimableBalanceTRX(
  address,
  amount,
  asset,
  claimants,
  name,
  value,
) {
  const account = await server.loadAccount(address);

  let transaction = new StellarSDK.TransactionBuilder(account, {
    fee: transactionConsts.FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
  });

  transaction = transaction.addOperation(
    StellarSDK.Operation.createClaimableBalance({
      asset,
      amount: (new BN(amount)).toFixed(7),
      claimants,
    }),
  );

  transaction = transaction.addOperation(
    StellarSDK.Operation.manageData({
      name,
      value,
    }),
  );

  transaction = transaction.setTimeout(transactionConsts.TIMEOUT).build();

  return transaction;
}
