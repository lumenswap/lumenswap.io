import StellarSDK from 'stellar-sdk';
import extractErrorText from 'helpers/extractErrorText';

const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);

export default async function signWithPrivateKey(trx, privateKey) {
  try {
    trx.sign(StellarSDK.Keypair.fromSecret(privateKey));

    const result = await server.submitTransaction(trx);
    return result.hash;
  } catch (error) {
    throw new Error(extractErrorText(error));
  }
}
