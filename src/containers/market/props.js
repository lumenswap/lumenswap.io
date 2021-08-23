import { getKnownAssets } from 'api/market';

export async function marketPageGetServerSideProps(context) {
  const result = await getKnownAssets();

  return {
    props: {
      assets: result.data,
    },
  };
}
