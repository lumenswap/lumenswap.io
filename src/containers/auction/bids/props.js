import { getAllAuctions } from 'api/auction';

async function BidsPageGetServerSideProps({ params }) {
  const pageName = params.name;
  const assetCode = pageName.substring(
    pageName.indexOf('(') + 1,
    pageName.lastIndexOf(')'),
  );

  const infoData = await getAllAuctions({ assetCode });

  return {
    props: {
      pageName,
      assetCode,
      auction: infoData[0],
    },
  };
}

export default BidsPageGetServerSideProps;
