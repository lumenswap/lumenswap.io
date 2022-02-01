import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import useIsLogged from './useIsLogged';

function useRequiredLogin(redirectPath) {
  const isLogged = useIsLogged();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push(redirectPath);
    }
  }, [isLogged]);
}

export default useRequiredLogin;
