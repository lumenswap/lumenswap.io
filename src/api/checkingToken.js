import StellarSDK from 'stellar-sdk';

export default async function checkingToken(code, issuer) {
  const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);
}
