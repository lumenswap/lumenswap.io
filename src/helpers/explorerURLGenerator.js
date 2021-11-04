import BN from './BN';

const LUMENSCAN_URL = 'https://lumenscan.io';
const STELLAR_EXPERT = 'https://stellar.expert/explorer/public';

// export function generateTransactionURL(tx) {
//   return `${LUMENSCAN_URL}/txns/${tx}`;
// }

export function generateTransactionURL(tx) {
  return `${STELLAR_EXPERT}/tx/${tx}`;
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

export function generateOperationIdURL(operationId) {
  const oneBefore = new BN(operationId).minus(1).toFixed(0);
  const oneAfter = new BN(operationId).plus(1).toFixed(0);

  return `${STELLAR_EXPERT}/tx/${oneBefore}#${oneAfter}`;
}
