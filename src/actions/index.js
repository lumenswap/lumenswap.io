const actionTypes = {
  modal: {
    SHOW: 'modal/SHOW',
    HIDE: 'modal/HIDE',
  },
  user: {
    LOGIN: 'user/LOGIN',
    LOGOUT: 'user/LOGOUT',
  },
  checkout: {
    UPDATE: 'checkout/UPDATE',
    CLEAR: 'checkout/CLEAR',
  },
  userToken: {
    SET: 'userToken/SET',
  },
  lumenTokens: {
    SET: 'lumenTokens/SET',
    ADD: 'lumenTokens/ADD',
  },
};

export default actionTypes;
