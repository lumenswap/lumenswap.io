import { getCollectionStats, getSingleCollection } from 'api/nft';

export async function NFTCollectionNftsPageGetServerSideProps({ params }) {
  const collectionId = params.collectionId;
  const collectionData = await getSingleCollection(collectionId);
  const collectionStats = await getCollectionStats(collectionId);

  return {
    props: {
      collectionData,
      collectionStats,
    },
  };
}
