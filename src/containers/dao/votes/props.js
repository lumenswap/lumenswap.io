import { getProposalAsset } from 'api/mockAPI/proposalInfo';

export async function daoProposalVotesGetServerSideProps({ params }) {
  try {
    const governanceAssetInfo = await getProposalAsset(params.name);
    return {
      props: {
        governanceAssetInfo,
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
