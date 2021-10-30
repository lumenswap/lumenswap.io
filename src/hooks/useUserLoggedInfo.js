const { useSelector } = require('react-redux');

function useLoggedInfo() {
  const isLogged = useSelector((state) => state.user.logged);
  return isLogged;
}

export default useLoggedInfo;
