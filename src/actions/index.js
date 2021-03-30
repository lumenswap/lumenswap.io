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
  },
  userCustomTokens: {
    ADD: 'userCustomTokens/ADD',
    REMOVE: 'userCustomTokens/REMOVE',
    SET: 'userCustomTokens/SET',
  },
};

export default actionTypes;
