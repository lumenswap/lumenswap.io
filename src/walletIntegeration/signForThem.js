import { loginTypes } from 'reducers/user';
import { initializeStore } from 'store';
import signWithAlbedo from './sign/signWithAlbedo';
import signWithFreighter from './sign/signWithFreighter';
import signWithLedger from './sign/signWithLedger';
import signWithPrivateKey from './sign/signWithPrivateKey';
import signWithRabet from './sign/signWithRabet';
import signWithXbull from './sign/signWithXbull';

export default function signForThem(trx, dispatch) {
  const store = initializeStore();
  const user = store.getState().user;

  if (user.loginType === loginTypes.PV) {
    console.log('inja miai');
    return signWithPrivateKey(trx, user.detail.privateKey, dispatch);
  }

  if (user.loginType === loginTypes.ALBEDO) {
    return signWithAlbedo(trx, dispatch);
  }

  if (user.loginType === loginTypes.LEDGER_S) {
    return signWithLedger(trx, user.detail.address, dispatch);
  }

  if (user.loginType === loginTypes.FREIGHTER) {
    return signWithFreighter(trx, dispatch);
  }

  if (user.loginType === loginTypes.RABET) {
    return signWithRabet(trx, dispatch);
  }

  if (user.loginType === loginTypes.XBULL) {
    return signWithXbull(trx, dispatch);
  }

  throw new Error('cannot handle login type');
}
