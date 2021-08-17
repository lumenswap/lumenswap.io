import BN from 'helpers/BN';
import getAssetDetails from 'helpers/getAssetDetails';
import StellarSdk from 'stellar-sdk';
import LSP from 'tokens/LSP';
import XLM from 'tokens/XLM';

const server = new StellarSdk.Server('https://horizon.stellar.org');

export default async function fetchOfferAuction() {
  const res = await server
    .offers()
    .selling(getAssetDetails(XLM))
    .buying(
      getAssetDetails(LSP),
    )
    .order('desc')
    .limit(200)
    .call();

  return res.records
    .map((i) => ({
      address: i.seller,
      xlmAmount: new BN(i.amount),
      lspAmount: new BN(i.amount).times(i.price),
      lspPrice: new BN(i.amount).dividedBy(new BN(i.amount).times(i.price)),
      time: i.last_modified_time,
      id: i.id,
    }))
    .filter((i) => i.lspPrice.isGreaterThanOrEqualTo(0.002))
    .slice(0, 25);
}
