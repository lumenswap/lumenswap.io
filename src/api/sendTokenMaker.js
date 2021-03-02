import sendTokenWithPrivateKey from './sendTokenWithPrivateKey';
import store from 'src/store';
import { loginTypes } from 'src/reducers/user';
import sendTokenWithAlbedoLink from './sendTokenWithAlbedoLink';
import sendTokenWithLedgerS from 'src/stellar-transactions/sendTokenWithLedgerS';
import sendTokenWithFreighter from 'src/stellar-transactions/sendTokenWithFreighter';
import sendTokenWithTrezor from 'src/stellar-transactions/sendTokenWithTrezor';
import sendTokenWithRabet from 'src/stellar-transactions/sendTokenWithRabet';

export default function sendTokenMaker() {
  const { user } = store.getState();
  if (user.loginType === loginTypes.ALBEDO) {
    sendTokenWithAlbedoLink();
  } else if (user.loginType === loginTypes.PV) {
    sendTokenWithPrivateKey();
  } else if (user.loginType === loginTypes.LEDGER_S) {
    sendTokenWithLedgerS();
  } else if (user.loginType === loginTypes.FREIGHTER) {
    sendTokenWithFreighter();
  } else if (user.loginType === loginTypes.TREZOR) {
    sendTokenWithTrezor();
  } else if (user.loginType === loginTypes.RABET) {
    sendTokenWithRabet();
  }
}
