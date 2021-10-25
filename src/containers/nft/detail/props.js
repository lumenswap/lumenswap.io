import fetchNFTDetails from 'api/nftDetailsAPI';

export const nftDetailsPageGetServerSideProps = async ({ params }) => {
  const id = params.id;
  const data = await fetchNFTDetails(id);

  return {
    props: {
      id, data,
    },
  };
};
