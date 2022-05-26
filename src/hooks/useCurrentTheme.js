const { useSelector } = require('react-redux');

function useCurrentTheme() {
  const currentTheme = useSelector((state) => state.theme);
  return currentTheme;
}

export default useCurrentTheme;
