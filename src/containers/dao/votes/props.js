import { getProposalAsset } from 'api/mockAPI/proposalInfo';

export async function daoProposalVotesGetServerSideProps({ params }) {
  try {
    const info = await getProposalAsset(params.name);
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
