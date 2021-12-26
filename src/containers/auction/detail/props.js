import { getAllAuctions, getTotalBids } from 'api/auction';

async function auctionPageGetServerSideProps({ params }) {
  const pageName = params.name;
  const assetCode = pageName.substring(
    pageName.indexOf('(') + 1,
    pageName.lastIndexOf(')'),
  );

  const infoData = await getAllAuctions({ assetCode });
  const sumBids = await getTotalBids(infoData[0].id);
  infoData[0].totalBids = sumBids[0].totalBid;

  return {
    props: {
      infoData: infoData[0],
      pageName,
      assetCode,
    },
  };
}

export default auctionPageGetServerSideProps;
