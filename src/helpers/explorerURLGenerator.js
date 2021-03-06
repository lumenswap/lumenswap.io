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
  return `${LUMENSCAN_URL}/assets/${code}-${issuer}`;
}

export function ipfsHashGenerator(hash) {
  return `${IPFS_URL}/ipfs/${hash}`;
}

export function generateOperationIdURL(operationId) {
  return `${LUMENSCAN_URL}/ops/${operationId}`;
}

export function generateSolanaTransactionURL(tx) {
  return `https://solscan.io/tx/${tx}`;
}

export function generateBTCTransactionURL(tx) {
  return `https://www.blockchain.com/btc/tx/${tx}`;
}

export function generateETHTransactionURL(tx) {
  return `https://etherscan.io/tx/${tx}`;
}

export function generateBTCAddressURL(address) {
  return `https://www.blockchain.com/btc/address/${address}`;
}

export function generateETHAddressURL(address) {
  return `https://etherscan.io/address/${address}`;
}

export function generateSolanaAddressURL(address) {
  return `https://solscan.io/account/${address}`;
}
