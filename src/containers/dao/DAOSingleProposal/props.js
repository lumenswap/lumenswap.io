import { getProposalInfo } from '../../../api/mockAPI/proposalInfo';

export async function daoProposalInfoGetServerSideProps({ params }) {
  try {
    const proposalInfo = await getProposalInfo(params.id);
    return {
      props: {
        proposalInfo,
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
