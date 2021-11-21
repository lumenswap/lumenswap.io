import { getVolume24ForPool } from 'api/amm';
import { getPoolDetailsById } from 'api/stellarPool';

export async function PoolDetailPageGetServerSideProps({ params }) {
  try {
    const poolDetail = await getPoolDetailsById(params.poolId);
    const volume24 = await getVolume24ForPool(params.poolId);
    return {
      props: {
        poolDetail: {
          ...poolDetail,
          volume24,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
