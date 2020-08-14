import sendTokenWithPrivateKey from './sendTokenWithPrivateKey';
import store from 'src/store';
import { loginTypes } from 'src/reducers/user';
import sendTokenWithAlbedoLink from './sendTokenWithAlbedoLink';

export default function sendTokenMaker() {
  const { user } = store.getState();
  if (user.loginType === loginTypes.ALBEDO) {
    sendTokenWithAlbedoLink();
  } else if (user.loginType === loginTypes.PV) {
    sendTokenWithPrivateKey();
  }
}
