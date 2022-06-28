import { isSameAsset } from 'helpers/asset';

export default function isDefaultToken(token, defaultTokens) {
  return defaultTokens?.find((defaultToken) => isSameAsset(defaultToken, token));
}

export const isDefaultCode = (tokenCode, defaultTokens) => defaultTokens
  ?.some((defaultToken) => defaultToken.code === tokenCode);

export const extractTokenFromCode = (tokenCode, defaultTokens) => defaultTokens
  ?.find((defaultToken) => defaultToken.code === tokenCode);
