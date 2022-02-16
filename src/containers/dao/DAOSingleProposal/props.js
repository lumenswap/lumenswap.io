import { getSingleProposal } from 'api/daoAPI';

export async function daoProposalInfoGetServerSideProps({ params }) {
  try {
    const proposalInfo = await getSingleProposal(params.id);

    return {
      props: {
        proposalInfo,
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
