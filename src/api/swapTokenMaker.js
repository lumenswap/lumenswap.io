import store from 'src/store';
import { loginTypes } from 'src/reducers/user';
import swapTokenWithPrivateKey from './swapTokenWithPrivateKey';
import swapTokenWithAlbedoLink from './swapTokenWithAlbedoLink';
import swapTokenWithLedgerS from 'src/stellar-transactions/swapTokenWithLedgerS';
import swapTokenWithTrezor from 'src/stellar-transactions/swapTokenWithTrezor';
import swapTokenWithFreighter from 'src/stellar-transactions/swapTokenWithFreighter';

export function swapTokenMaker() {
  const { user } = store.getState();
  if (user.loginType === loginTypes.ALBEDO) {
    swapTokenWithAlbedoLink();
  } else if (user.loginType === loginTypes.PV) {
    swapTokenWithPrivateKey();
  } else if (user.loginType === loginTypes.LEDGER_S) {
    swapTokenWithLedgerS();
  } else if (user.loginType === loginTypes.TREZOR) {
    swapTokenWithTrezor();
  } else if (user.loginType === loginTypes.FREIGHTER) {
    swapTokenWithFreighter();
  }
}
