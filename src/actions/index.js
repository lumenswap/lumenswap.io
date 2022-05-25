const actionTypes = {
  user: {
    LOGIN: 'user/LOGIN',
    LOGOUT: 'user/LOGOUT',
    UPDATE_DETAIL: 'user/UPDATE_DETAIL',
  },
  tokenList: {
    SET: 'tokenList/SET',
  },
  modal: {
    OPEN: 'connectModal/OPEN',
    CLOSE: 'connectModal/CLOSE',
    UPDATE_PROPS: 'connectModal/UPDATE_PROPS',
  },
  userBalance: {
    SET: 'userBalance/SET',
    CLEAR: 'userBalance/CLEAR',
  },
  userCustomTokens: {
    ADD: 'userCustomTokens/ADD',
    REMOVE: 'userCustomTokens/REMOVE',
  },
  userCustomPairs: {
    ADD: 'userCustomPairs/ADD',
    REMOVE: 'userCustomPairs/REMOVE',
  },
  customOrderPrice: {
    SET: 'customOrderPrice/SET',
  },
  xlmPrice: {
    UPDATE: 'xlmPrice/UPDATE',
  },
  lspPrice: {
    UPDATE: 'lspPrice/UPDATE',
  },
  theme: {
    TOGGLE: 'theme/TOGGLE',
  },
};

export default actionTypes;
