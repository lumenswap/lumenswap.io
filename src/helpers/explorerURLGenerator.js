const LUMENSCAN_URL = 'https://lumenscan.io';
const IPFS_URL = 'https://ipfs.io';
// const STELLAR_EXPERT = 'https://stellar.expert/explorer/public';

export function generateTransactionURL(tx) {
  return `${LUMENSCAN_URL}/txns/${tx}`;
}

// export function generateTransactionURL(tx) {
//   return `${STELLAR_EXPERT}/tx/${tx}`;
// }

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
  console.log(issuer);
  return `${LUMENSCAN_URL}/assets/${code}-${issuer}`;
}

export function ipfsHashGenerator(hash) {
  return `${IPFS_URL}/ipfs/${hash}`;
}

export function generateOperationIdURL(operationId) {
  return `${LUMENSCAN_URL}/ops/${operationId}`;
}
