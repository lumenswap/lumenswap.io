import { getSingleRound } from 'api/lottery';

export const roundInfoGetServerSideProps = async (context) => {
  try {
    const round = await getSingleRound(context.query.round);
    return {
      props: {
        fetchedRound: round.data,
      },
    };
  } catch (error) {
    if (error.response.status === 404) {
      return {
        notFound: true,
      };
    }
    throw error;
  }
};
