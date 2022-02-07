import { getAllAuctions, getTotalBids } from 'api/auction';

async function auctionPageGetServerSideProps({ params }) {
  const pageName = params.name;

  const allAuctions = await getAllAuctions({ title: pageName });

  if (allAuctions.length <= 0) {
    return {
      notFound: true,
    };
  }

  const sumBids = await getTotalBids(allAuctions[0].id);
  allAuctions[0].totalBids = sumBids[0].totalBid;
  allAuctions[0].totalAmount = sumBids[0].totalAmount;

  const assetCode = allAuctions[0].assetCode;

  return {
    props: {
      auction: allAuctions[0],
      pageName,
      assetCode,
    },
  };
}

export default auctionPageGetServerSideProps;
