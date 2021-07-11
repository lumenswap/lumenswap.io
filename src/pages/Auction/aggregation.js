import BN from 'helpers/BN';
import getAssetDetails from 'helpers/getAssetDetails';
import StellarSdk from 'stellar-sdk';
import LSP from 'tokens/LSP';
import XLM from 'tokens/XLM';

const server = new StellarSdk.Server('https://horizon.stellar.org');

function fetchOffers() {
  return server
    .offers()
    .selling(getAssetDetails(XLM))
    .buying(
      getAssetDetails(LSP),
    )
    .order('desc')
    .limit(200)
    .call();
}

async function goNextAndSave(func, arr) {
  const fetchedRecords = await func();
  const res = [...arr];

  if (fetchedRecords.records.length > 0) {
    const toSaveRecords = fetchedRecords.records
      .filter((i) => {
        // return true;
        const price = new BN(i.amount).dividedBy(new BN(i.amount).times(i.price));
        return price.isGreaterThanOrEqualTo('0.002');
      })
      .map((i) => ({
        address: i.seller,
        xlmAmount: i.amount,
        lspAmount: new BN(i.amount).times(i.price),
        lspPrice: new BN(i.amount).dividedBy(new BN(i.amount).times(i.price)),
      }));

    res.push(...toSaveRecords);

    return goNextAndSave(fetchedRecords.next, res);
  }

  return Promise.resolve(res);
}

export const CHART_KEYS = ['0', '0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08'];

export default async function aggregateLSPOffer() {
  const allData = await goNextAndSave(fetchOffers, []);

  const res = {
    totalXLM: new BN(0),
    totalLSP: new BN(0),
  };

  for (const chartKey of CHART_KEYS) {
    res[chartKey] = new BN(0);
  }

  for (const item of allData) {
    res.totalLSP = res.totalLSP.plus(item.lspAmount);
    res.totalXLM = res.totalXLM.plus(item.xlmAmount);

    CHART_KEYS.forEach((chartKey) => {
      if (item.lspPrice.isGreaterThanOrEqualTo(chartKey)) {
        res[chartKey] = res[chartKey].plus(item.lspAmount);
      }
    });
  }

  return {
    ...res,
    totalXLM: res.totalXLM,
    totalLSP: res.totalLSP,
    totalBids: allData.length,
    latestBid: allData[0],
  };
}
