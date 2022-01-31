import { getProposalInfo } from '../../../api/mockAPI/proposalInfo';

export async function daoProposalInfoGetServerSideProps({ params }) {
  try {
    const info = await getProposalInfo(params.id);
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
