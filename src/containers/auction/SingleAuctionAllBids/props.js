import { getAllAuctions } from 'api/auction';

async function BidsPageGetServerSideProps({ params }) {
  const pageName = params.name;

  const allAuctions = await getAllAuctions({ title: pageName });

  if (allAuctions.length <= 0) {
    return {
      notFound: true,
    };
  }

  const assetCode = allAuctions[0].assetCode;

  return {
    props: {
      pageName,
      assetCode,
      auction: allAuctions[0],
    },
  };
}

export default BidsPageGetServerSideProps;
