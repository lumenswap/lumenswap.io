import {
  isConnected,
  getPublicKey,
} from '@stellar/freighter-api';

export default function loginWithFreighter() {
  if (isConnected()) {
    return getPublicKey();
  }

  throw new Error('You do not have Freighter');
}
