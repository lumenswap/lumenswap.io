import { getProposalInfo } from '../../../api/mockAPI/proposalInfo';

export async function daoProposalInfoGetServerSideProps({ params }) {
  const info = await getProposalInfo(params.id);
  return {
    props: {
      info,
    },
  };
}
