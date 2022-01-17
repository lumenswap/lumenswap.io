import { getAllAuctions } from 'api/auction';

async function BidsPageGetServerSideProps({ params }) {
  const pageName = params.name;

  const infoData = await getAllAuctions({ title: pageName });

  if (infoData.length <= 0) {
    return {
      notFound: true,
    };
  }

  const assetCode = infoData[0].assetCode;

  return {
    props: {
      pageName,
      assetCode,
      auction: infoData[0],
    },
  };
}

export default BidsPageGetServerSideProps;
