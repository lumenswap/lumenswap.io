import { getGovernanceProposals, getGovernances } from 'api/daoAPI';

export async function daoProposalsGetServerSideProps({ params }) {
  try {
    const governanceInfoResponse = await getGovernances({ name: params.name });

    if (!governanceInfoResponse || !governanceInfoResponse.length) {
      return {
        notFound: true,
      };
    }

    const governanceInfo = governanceInfoResponse[0];

    const proposals = await getGovernanceProposals(governanceInfo.id);

    return {
      props: {
        proposals,
        governanceInfo,
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
