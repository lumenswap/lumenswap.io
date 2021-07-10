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

export default async function aggregateLSPOffer() {
  const allData = await goNextAndSave(fetchOffers, []);

  const res = {
    0: new BN(0),
    0.01: new BN(0),
    0.02: new BN(0),
    0.03: new BN(0),
    0.04: new BN(0),
    0.05: new BN(0),
    0.06: new BN(0),
    totalXLM: new BN(0),
    totalLSP: new BN(0),
  };

  for (const item of allData) {
    res.totalLSP = res.totalLSP.plus(item.lspAmount);
    res.totalXLM = res.totalXLM.plus(item.xlmAmount);

    let key = '0';
    if (item.lspPrice.isLessThan(0.01)) {
      key = '0';
    } else if (item.lspPrice.isLessThan(0.02)) {
      key = '0.01';
    } else if (item.lspPrice.isLessThan(0.03)) {
      key = '0.02';
    } else if (item.lspPrice.isLessThan(0.04)) {
      key = '0.03';
    } else if (item.lspPrice.isLessThan(0.05)) {
      key = '0.04';
    } else if (item.lspPrice.isLessThan(0.06)) {
      key = '0.05';
    } else {
      key = '0.06';
    }

    res[key] = res[key].plus(item.lspAmount);
  }

  return {
    0: res[0].toString(),
    0.01: res['0.01'].toString(),
    0.02: res['0.02'].toString(),
    0.03: res['0.03'].toString(),
    0.04: res['0.04'].toString(),
    0.05: res['0.05'].toString(),
    0.06: res['0.06'].toString(),
    totalXLM: res.totalXLM.toString(),
    totalLSP: res.totalLSP.toString(),
    totalBids: allData.length,
    latestBid: allData[0],
  };
}
