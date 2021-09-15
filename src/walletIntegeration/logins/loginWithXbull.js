export default async function loginWithXbull() {
  await global.xBullSDK.connect({
    canRequestPublicKey: true,
    canRequestSign: true,
  });

  return global.xBullSDK.getPublicKey();
}
