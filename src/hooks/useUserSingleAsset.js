import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import { useSelector } from 'react-redux';

function useUserSingleAsset(asset) {
  const userBalance = useSelector((state) => state.userBalance);
  console.log(userBalance.find((balance) => {
    console.log(balance.asset, asset, isSameAsset(getAssetDetails(balance.asset), asset));
    return isSameAsset(getAssetDetails(balance.asset), asset);
  }));
  return userBalance.find((balance) => isSameAsset(getAssetDetails(balance.asset), asset));
}

export default useUserSingleAsset;
