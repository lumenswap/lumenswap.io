import { getVotesForProposal } from 'api/daoAPI';

export async function daoProposalVotesGetServerSideProps({ params }) {
  try {
    const proposalVotes = await getVotesForProposal(params.id);

    const singleProposal = proposalVotes.data[0];

    return {
      props: {
        proposalVotes: proposalVotes.data,
        proposalInfo: {
          title: singleProposal?.Proposal.title,
          info: {
            assetCode: singleProposal?.Proposal.Governance.assetCode,
            assetIssuer: singleProposal?.Proposal.Governance.assetIssuer,
          },
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
