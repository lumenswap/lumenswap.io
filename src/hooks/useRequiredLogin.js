import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import useIsLogged from './useIsLogged';

function useRequiredLogin(path) {
  const isLogged = useIsLogged();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      return router.push(path);
    }
    return null;
  }, [isLogged]);

  return null;
}

export default useRequiredLogin;
