import getDAOGovernances from '../../../api/mockAPI/daoGovernances';

export async function daoBoardsGetServerSideProps() {
  try {
    const governances = await getDAOGovernances();

    return {
      props: {
        governances,
      },
    };
  } catch (e) {
    if (e.response.status === 404) {
      return {
        notFound: true,
      };
    }
    throw e;
  }
}
