import { getProposalAsset } from 'api/mockAPI/proposalInfo';

export async function daoCreateProposalGetServerSideProps({ params }) {
  try {
    const pageInfo = await getProposalAsset(params.name);
    return {
      props: {
        pageInfo,
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
