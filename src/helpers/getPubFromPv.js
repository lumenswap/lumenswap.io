import StellarSDK from 'stellar-sdk';

export default function getPubFromPv(privateKey) {
  try {
    return StellarSDK.Keypair.fromSecret(privateKey).publicKey();
  } catch (e) {
    return null;
  }
}
