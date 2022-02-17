import { getGovernanceProposals, getGovernances } from 'api/daoAPI';
import { listAssets } from 'api/stellar';
import { getAssetDetails } from 'helpers/asset';

export async function daoProposalsGetServerSideProps({ params }) {
  try {
    const governanceInfoResponse = await getGovernances({ name: params.name });

    if (!governanceInfoResponse || !governanceInfoResponse.length) {
      return {
        notFound: true,
      };
    }

    const governanceInfo = governanceInfoResponse[0];

    const assetDetails = getAssetDetails({
      code: governanceInfo.assetCode,
      issuer: governanceInfo.assetIssuer,
    });

    const assets = await listAssets({ asset_code: assetDetails.code });

    const assetData = assets._embedded.records.find(
      (asset) => asset.asset_code
      === governanceInfo.assetCode && asset.asset_issuer === governanceInfo.assetIssuer,
    );

    const communityMembersCount = assetData?.num_accounts || 0;

    const proposals = await getGovernanceProposals(governanceInfo.id);

    return {
      props: {
        proposals,
        governanceInfo: {
          ...governanceInfo,
          communityMembersCount,
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
