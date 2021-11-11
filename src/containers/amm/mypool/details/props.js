import { getPoolDetailsById } from 'api/stellarPool';

export async function myPoolDetailsPageGetServerSideProps({ params }) {
  try {
    const poolDetail = await getPoolDetailsById(params.poolId);
    return {
      props: {
        poolDetail,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
