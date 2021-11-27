import { getAccounts } from 'api/nft';

export default function getLusiOwner(lusiId) {
  return getAccounts(lusiId).then(async (res) => {
    if (res.data._embedded.records.length > 0) {
      for (const account of res.data._embedded.records) {
        for (const balance of account.balances) {
          if
          (
            balance.asset_code === lusiId
                    && balance.asset_issuer === process.env.REACT_APP_LUSI_ISSUER
          ) {
            return {
              address: account.account_id,
              telegram: account.x.data.telegram,
              twitter: account.x.data.twitter,
            };
          }
        }
      }

      const nextPageAccounts = await getAccounts(
        lusiId, res.data._embedded.records[0].paging_token,
      );

      if (nextPageAccounts.data._embedded.records.length > 0) {
        for (const account of nextPageAccounts.data._embedded.records) {
          for (const balance of account.balances) {
            if
            (
              balance.asset_code === lusiId
                        && balance.asset_issuer === process.env.REACT_APP_LUSI_ISSUER
            ) {
              return {
                address: account.account_id,
                telegram: account.telegram,
                twitter: account.twitter,
              };
            }
          }
        }
      }
    }

    return {
      address: '',
      telegram: '',
      twitter: '',
    };
  });
}
