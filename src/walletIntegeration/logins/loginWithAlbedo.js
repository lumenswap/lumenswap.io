import albedo from '@albedo-link/intent';

async function loginWithAlbedo() {
  const res = await albedo.publicKey();
  return res.pubkey;
}
global.loginWith = loginWithAlbedo;

export default loginWithAlbedo;
