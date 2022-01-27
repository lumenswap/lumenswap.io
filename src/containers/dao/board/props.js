import getDAOBorads from '../../../api/mockAPI/daoBoards';

export async function daoBoardsGetServerSideProps() {
  const boards = await getDAOBorads();

  return {
    props: {
      boards,
    },
  };
}
