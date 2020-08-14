import store from 'src/store';
import { loginTypes } from 'src/reducers/user';
import swapTokenWithPrivateKey from './swapTokenWithPrivateKey';
import swapTokenWithAlbedoLink from './swapTokenWithAlbedoLink';

export function swapTokenMaker() {
  const { user } = store.getState();
  if (user.loginType === loginTypes.ALBEDO) {
    swapTokenWithAlbedoLink();
  } else if (user.loginType === loginTypes.PV) {
    swapTokenWithPrivateKey();
  }
}