import { fetchAuctionInfoData } from 'api/AuctionFakeData';

async function auctionPageGetServerSideProps({ params }) {
  const pageName = params.name;
  const assetCode = pageName.substring(
    pageName.indexOf('(') + 1,
    pageName.lastIndexOf(')'),
  );
  const infoData = await fetchAuctionInfoData(assetCode);

  return {
    props: {
      infoData,
      pageName,
      assetCode,
    },
  };
}

export default auctionPageGetServerSideProps;
