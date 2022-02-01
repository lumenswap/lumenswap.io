import { getAssetDetails } from 'helpers/asset';

const activity = [
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'claimed',
  },
  {
    name: 'Lumenswap',
    asset: {
      code: 'LSP',
      issuer: 'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
    },
    date: 1643036069610,
    amount: 1369414125,
    info: 'Create DAO',
    type: 'not-claimed',
  },
  {
    name: 'Rabet',
    asset: {
      code: 'RBT',
      issuer: 'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    },
    date: 1643036069610,
    amount: 1312414125,
    info: 'Create DAO',
    type: 'in-progress',
  },
];

export function getMyActivity(userAddress, query) {
  if (query.type === 'all') {
    return new Promise((reslove) => setTimeout(reslove, 2000)).then(
      () => ({
        data: activity.slice(query.page * 10 - 10, query.page * 10),
        totalPages: Math.ceil(activity.length / 10),
      }),
    );
  }
  return new Promise((reslove) => setTimeout(reslove, 2000)).then(
    () => {
      const filteredActivities = activity.filter((item) => item.type === query.type);
      return {
        data: filteredActivities.slice(query.page * 10 - 10, query.page * 10),
        totalPages: Math.ceil(filteredActivities.length / 10),
      };
    },
  );
}
