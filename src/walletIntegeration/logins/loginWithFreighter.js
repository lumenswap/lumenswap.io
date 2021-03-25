import {
  isConnected,
  getPublicKey,
} from '@stellar/freighter-api';

export default async function loginWithFreighter() {
  if (isConnected()) {
    const publicKey = await getPublicKey();
    return { publicKey };
  }

  throw new Error('You do not have Freighter');
}
