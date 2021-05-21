const actionTypes = {
  user: {
    LOGIN: 'user/LOGIN',
    LOGOUT: 'user/LOGOUT',
  },
  tokenList: {
    SET: 'tokenList/SET',
  },
  modal: {
    OPEN: 'connectModal/OPEN',
    CLOSE: 'connectModal/CLOSE',
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
};

export default actionTypes;
