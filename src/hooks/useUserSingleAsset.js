import { getAssetDetails, isSameAsset } from 'helpers/asset';
import { useSelector } from 'react-redux';

function useUserSingleAsset(asset) {
  const userBalance = useSelector((state) => state.userBalance);
  return userBalance.find((balance) => isSameAsset(getAssetDetails(balance.asset), asset));
}

export default useUserSingleAsset;
