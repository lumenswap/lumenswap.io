import { loginTypes } from 'reducers/user';
import store from 'store';
import signWithAlbedo from './sign/signWithAlbedo';
import signWithFreighter from './sign/signWithFreighter';
import signWithLedger from './sign/signWithLedger';
import signWithPrivateKey from './sign/signWithPrivateKey';
import signWithRabet from './sign/signWithRabet';

export default function signForThem(trx) {
  const user = store.getState().user;

  if (user.loginType === loginTypes.PV) {
    return signWithPrivateKey(trx, user.detail.privateKey);
  }

  if (user.loginType === loginTypes.ALBEDO) {
    return signWithAlbedo(trx);
  }

  if (user.loginType === loginTypes.LEDGER_S) {
    return signWithLedger(trx, user.detail.address);
  }

  if (user.loginType === loginTypes.FREIGHTER) {
    return signWithFreighter(trx);
  }

  if (user.loginType === loginTypes.RABET) {
    return signWithRabet(trx);
  }

  throw new Error('cannot handle login type');
}
