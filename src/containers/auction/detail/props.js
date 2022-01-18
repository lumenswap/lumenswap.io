import { getAllAuctions, getTotalBids } from 'api/auction';

async function auctionPageGetServerSideProps({ params }) {
  const pageName = params.name;

  const infoData = await getAllAuctions({ title: pageName });

  if (infoData.length <= 0) {
    return {
      notFound: true,
    };
  }

  const sumBids = await getTotalBids(infoData[0].id);
  infoData[0].totalBids = sumBids[0].totalBid;
  infoData[0].totalAmount = sumBids[0].totalAmount;

  const assetCode = infoData[0].assetCode;

  return {
    props: {
      infoData: infoData[0],
      pageName,
      assetCode,
    },
  };
}

export default auctionPageGetServerSideProps;
