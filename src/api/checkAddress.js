import StellarSDK from 'stellar-sdk';

export default function checkAddress(address) {
  return StellarSDK.StrKey.isValidEd25519PublicKey(address);
}
