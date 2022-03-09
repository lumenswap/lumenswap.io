const convertInfo = {
  orderID: 'L74215',
  status: 'success',
};

const transactionInfo = {
  status: 'success',
  transactionID: '1kab13b1jb3',
  tx_hash: '0x401b914336b87673822c1792786bf0ccf1793795c594c42f174078ff425697f8',
};

export function sendConvertReq(convertDetails) {
  return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => convertInfo);
}

export function sendLConvertReq(convertDetails) {
  return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => transactionInfo);
}

export function confirmTransactionReq(transactionID) {
  return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => convertInfo);
}
