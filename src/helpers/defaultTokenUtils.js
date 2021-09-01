import defaultTokens from 'tokens/defaultTokens';
import isSameAsset from 'helpers/isSameAsset';

export default function isDefaultToken(token) {
  return defaultTokens.find((defaultToken) => isSameAsset(defaultToken, token));
}

export const isDefaultCode = (tokenCode) => defaultTokens
  .some((defaultToken) => defaultToken.code.toLowerCase() === tokenCode.toLowerCase());

export const extractTokenFromCode = (tokenCode) => defaultTokens
  .find((defaultToken) => defaultToken.code.toLowerCase() === tokenCode.toLowerCase());
