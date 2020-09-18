import StellarSDK from 'stellar-sdk';

export default async function checkAddress(address) {
  return StellarSDK.StrKey.isValidEd25519PublicKey(address);
}
