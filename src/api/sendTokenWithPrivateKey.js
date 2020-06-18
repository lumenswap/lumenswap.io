import StellarSDK from 'stellar-sdk';
import store from 'src/store';

const server = new StellarSDK.Server(process.env.HORIZON);

export default async function sendTokenWithPrivateKey() {
  const { checkout, userToken } = store.getState();

  let needToTrust;
  if (checkout.toAsset.issuer === 'native') {
    needToTrust = false;
  } else {
    needToTrust = !userToken.find(
      (token) => token.asset_code === checkout.toAsset.code
      && token.asset_issuer === checkout.toAsset.issuer,
    );
  }

  console.log('jigar', needToTrust);

  // const account = await server.loadAccount(fromAddress);
  // const fee = await server.fetchBaseFee();
}
