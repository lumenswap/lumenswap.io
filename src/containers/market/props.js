import { getKnownAssets } from 'api/market';

export async function marketPageGetServerSideProps() {
  const result = await getKnownAssets();

  return {
    props: {
      assets: result.data,
    },
  };
}
