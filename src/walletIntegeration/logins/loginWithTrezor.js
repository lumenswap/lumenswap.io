import TrezorConnect from 'trezor-connect';

export default async function getPublicKeyFromTrezor() {
  const payloadFromTrezor = await TrezorConnect.stellarGetAddress({
    path: "m/44'/148'/0'",
  });
  if (payloadFromTrezor.success) {
    return payloadFromTrezor.payload.address;
  }

  throw new Error('Cannot connect');
}
