import getAssetDetails from './getAssetDetails';

const api = [
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
  {
    token1: getAssetDetails({
      code: 'XLM',
      issuer: 'GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH',
    }),
    token2: getAssetDetails({
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    }),
    balance: 12400,
  },
];

function getPools() {
  return api;
}
async function fetchPools(userAdress) {
  return new Promise((reslove) => setTimeout(reslove, 3000)).then(() => getPools());
}

export default fetchPools;
