const LUMENSCAN_URL = 'https://lumenscan.io';

export function generateTransactionURL(tx) {
  return `${LUMENSCAN_URL}/txns/${tx}`;
}

export function generateAddressURL(account) {
  return `${LUMENSCAN_URL}/account/${account}`;
}
