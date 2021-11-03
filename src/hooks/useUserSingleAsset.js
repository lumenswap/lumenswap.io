import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import { useSelector } from 'react-redux';

function useUserSingleAsset(asset) {
  const userBalance = useSelector((state) => state.userBalance);
  return userBalance.find((balance) => isSameAsset(getAssetDetails(balance.asset), asset));
}

export default useUserSingleAsset;
