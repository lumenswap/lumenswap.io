const LUMENSCAN_URL = 'https://lumenscan.io';

export function generateTransactionURL(tx) {
  return `${LUMENSCAN_URL}/txns/${tx}`;
}

export function generateAddressURL(account) {
  return `${LUMENSCAN_URL}/account/${account}`;
}

export function twitterUrlMaker(userName) {
  return `https://twitter.com/${userName}`;
}

export function telegramUrlMaker(userName) {
  return `https://t.me/${userName}`;
}

export function assetGenerator(code, issuer) {
  return `${LUMENSCAN_URL}/assets/${code}-${issuer}`;
}

export function ipfsHashGenerator(hash) {
  return `${LUMENSCAN_URL}/assets/${hash}`;
}
