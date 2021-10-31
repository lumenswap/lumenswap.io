const { useSelector } = require('react-redux');

function useIsLogged() {
  const isLogged = useSelector((state) => state.user.logged);
  return isLogged;
}

export default useIsLogged;
