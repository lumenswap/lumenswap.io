import { getProposalInfo } from '../../../api/mockAPI/proposals';

export async function daoProposalsGetServerSideProps({ params }) {
  try {
    const info = await getProposalInfo(params.name);
    return {
      props: {
        info,
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
