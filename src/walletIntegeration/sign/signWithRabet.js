import StellarSDK from 'stellar-sdk';
import extractErrorText from 'helpers/extractErrorText';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function signWithLedger(trx) {
  try {
    const signedTrx = await global.rabet.sign(
      trx.toXDR(),
      'mainnet',
    );
    const transaction = StellarSDK.TransactionBuilder.fromXDR(
      signedTrx.xdr,
      process.env.REACT_APP_HORIZON,
    );

    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (error) {
    throw new Error(extractErrorText(error));
  }
}
