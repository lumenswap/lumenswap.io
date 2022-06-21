import { useSelector } from 'react-redux';

function useDefaultTokens() {
  const defaultTokens = useSelector((state) => state.defaultTokens);
  return defaultTokens;
}

export default useDefaultTokens;
