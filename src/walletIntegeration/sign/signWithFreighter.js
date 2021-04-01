import StellarSDK from 'stellar-sdk';
import extractErrorText from 'helpers/extractErrorText';
import { signTransaction } from '@stellar/freighter-api';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function signWithFreighter(trx) {
  try {
    const signedXDR = await signTransaction(trx.toXDR());
    const transaction = StellarSDK.TransactionBuilder.fromXDR(
      signedXDR,
      process.env.REACT_APP_HORIZON,
    );

    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (error) {
    throw new Error(extractErrorText(error));
  }
}
