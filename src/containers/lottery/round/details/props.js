import { getSingleRound } from 'api/lottery';

export const roundParticipantGetServerSideProps = async (context) => {
  try {
    const round = await getSingleRound(context.query.round);
    return {
      props: {
        round: round.data,
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

export const roundTicketGetServerSideProps = async (context) => {
  try {
    const round = await getSingleRound(context.query.round);
    return {
      props: {
        round: round.data,
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
