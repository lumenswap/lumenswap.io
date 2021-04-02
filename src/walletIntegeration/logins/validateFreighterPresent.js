import { isConnected } from '@stellar/freighter-api';

export default function validateFreighterPresent() {
  return isConnected();
}
