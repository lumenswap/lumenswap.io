import getPubFromPv from 'helpers/getPubFromPv';

export default function loginWithPrivateKey(privateKey) {
  const publicKey = getPubFromPv(privateKey);
  if (!publicKey) {
    throw new Error('Your private key is not valid');
  }

  return publicKey;
}
