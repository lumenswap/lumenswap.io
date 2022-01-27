import { getProposalAsset } from 'api/mockAPI/proposalInfo';

export async function daoProposalVotesGetServerSideProps({ params }) {
  const info = getProposalAsset(params.name);
  return {
    props: {
      info,
    },
  };
}
