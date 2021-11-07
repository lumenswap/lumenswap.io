import { getKnownPools } from 'api/amm';

export default async function getPoolPageGetServerSideProps() {
  const allPools = await getKnownPools();

  return {
    props: {
      allPools,
    },
  };
}
