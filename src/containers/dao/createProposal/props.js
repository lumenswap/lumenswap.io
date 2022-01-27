import { getProposalAsset } from 'api/mockAPI/proposalInfo';

export async function daoCreateProposalGetServerSideProps({ params }) {
  const info = getProposalAsset(params.name);
  return {
    props: {
      info,
    },
  };
}
