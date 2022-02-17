import { getGovernances } from 'api/daoAPI';

export async function daoBoardsGetServerSideProps() {
  try {
    const governances = await getGovernances();

    return {
      props: {
        governances,
      },
    };
  } catch (e) {
    if (e.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw e;
  }
}
