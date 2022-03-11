import { useSelector } from 'react-redux';

function useUserAddress() {
  const userAddress = useSelector((state) => state.user.detail.address);
  return userAddress;
}

export default useUserAddress;
