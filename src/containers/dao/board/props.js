import getDAOBorads from '../../../api/mockAPI/daoBoards';

export async function daoBoardsGetServerSideProps() {
  try {
    const boards = await getDAOBorads();

    return {
      props: {
        boards,
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
