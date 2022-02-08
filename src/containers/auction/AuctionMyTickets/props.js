import { getAllAuctions } from 'api/auction';

async function myBidsPageGetServerSideProps() {
  const auctions = await getAllAuctions();

  return {
    props: {
      auctions,
    },
  };
}

export default myBidsPageGetServerSideProps;
