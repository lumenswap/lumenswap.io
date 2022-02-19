import { getSingleProposal } from 'api/daoAPI';

export async function daoProposalVotesGetServerSideProps({ params }) {
  try {
    const proposalDetails = await getSingleProposal(params.id);

    return {
      props: {
        proposalInfo: {
          assetInfo: {
            assetCode: proposalDetails?.Governance.assetCode,
            assetIssuer: proposalDetails?.Governance.assetIssuer,
          },
          governanceName: proposalDetails.Governance.name,
        },
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
