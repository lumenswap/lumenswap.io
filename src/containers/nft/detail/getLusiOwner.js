import { getAccounts } from 'api/nft';
import BN from 'helpers/BN';

export default function getLusiOwner(lusiId) {
  return getAccounts(lusiId).then(async (res) => {
    if (res.data._embedded.records.length > 0) {
      for (const account of res.data._embedded.records) {
        for (const balance of account.balances) {
          if (
            balance.asset_code === lusiId
            && balance.asset_issuer === process.env.REACT_APP_LUSI_ISSUER
            && new BN(balance.balance).gt(0)
          ) {
            return {
              address: account.account_id,
              telegram: account.data.LusiTelegram,
              twitter: account.data.LusiTwitter,
            };
          }
        }
      }

      const nextPageAccounts = await getAccounts(
        lusiId,
        res.data._embedded.records[0].paging_token,
      );

      if (nextPageAccounts.data._embedded.records.length > 0) {
        for (const account of nextPageAccounts.data._embedded.records) {
          for (const balance of account.balances) {
            if (
              balance.asset_code === lusiId
              && balance.asset_issuer === process.env.REACT_APP_LUSI_ISSUER
              && new BN(balance.balance).gt(0)
            ) {
              return {
                address: account.account_id,
                telegram: account.data.LusiTelegram,
                twitter: account.data.LusiTwitter,
              };
            }
          }
        }
      }
    }

    return {
      address: null,
      telegram: null,
      twitter: null,
    };
  });
}
