import StellarSDK from 'stellar-sdk';

export default async function checkAddress(address) {
  const server = new StellarSDK.Server(process.env.REACT_APP_HORIZON);
  const account = await server.loadAccount(address);

  return account;
}
