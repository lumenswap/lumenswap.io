import { getGovernances } from 'api/daoAPI';
import { listAssets } from 'api/stellar';
import { getAssetDetails } from 'helpers/asset';

export async function daoBoardsGetServerSideProps() {
  try {
    let governances = await getGovernances();

    governances = governances.map(async (item) => {
      const assetDetails = getAssetDetails({
        code: item.assetCode,
        issuer: item.assetIssuer,
      });

      const assets = await listAssets({ asset_code: assetDetails.code });

      const assetData = assets._embedded.records.find(
        (asset) => asset.asset_code === item.assetCode && asset.asset_issuer === item.assetIssuer,
      );

      const communityMembersCount = assetData?.num_accounts || 0;

      return {
        ...item,
        communityMembersCount,
      };
    });

    const enrichedGovernances = await Promise.all(governances);

    return {
      props: {
        governances: enrichedGovernances,
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
