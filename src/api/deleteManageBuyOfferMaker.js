import store from 'src/store';
import { loginTypes } from 'src/reducers/user';
import deleteManageBuyOfferWithAlbedo from './deleteManageBuyOfferWithAlbedo';
import deleteManageBuyOfferWithPrivate from './deleteManageBuyOfferWithPrivate';

export default function deleteManageBuyOfferMaker(offer) {
  const { user } = store.getState();
  if (user.loginType === loginTypes.ALBEDO) {
    return deleteManageBuyOfferWithAlbedo(offer);
  } else if (user.loginType === loginTypes.PV) {
    return deleteManageBuyOfferWithPrivate(offer);
  }
}
