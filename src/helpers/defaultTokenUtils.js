import defaultTokens from 'tokens/defaultTokens';
import { isSameAsset } from 'helpers/asset';
import { makeStore } from 'store';

export default function isDefaultToken(token) {
  return defaultTokens.find((defaultToken) => isSameAsset(defaultToken, token));
}

export const isDefaultCode = (tokenCode) => defaultTokens
  .some((defaultToken) => defaultToken.code === tokenCode);

export const extractTokenFromCode = (tokenCode) => {
  console.log(makeStore().getState());
  return defaultTokens
    .find((defaultToken) => defaultToken.code === tokenCode);
};
