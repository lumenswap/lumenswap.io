import StellarSDK from 'stellar-sdk';

export default (privateKey) => {
  try {
    return StellarSDK.Keypair.fromSecret(privateKey).publicKey();
  } catch (e) {
    return null;
  }
};
