import { getGovernances } from 'api/daoAPI';
import BN from 'helpers/BN';

export async function daoCreateProposalGetServerSideProps({ params }) {
  try {
    let governance = await getGovernances(params.name);

    governance = governance[0];

    const pageInfo = {
      id: governance.id,
      assetCode: governance.assetCode,
      assetIssuer: governance.assetIssuer,
      name: governance.name,
      officialName: governance.name.toLowerCase(),
      assetColor: governance.assetColor,
      minValue: new BN(governance.minimumCreateProposalAmount).toFixed(0),
    };

    return {
      props: {
        pageInfo,
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
