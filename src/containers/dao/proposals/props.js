import { getProposalInfo } from '../../../api/mockAPI/proposals';

export async function daoProposalsGetServerSideProps({ params }) {
  const info = await getProposalInfo(params.name);
  return {
    props: {
      info,
    },
  };
}
