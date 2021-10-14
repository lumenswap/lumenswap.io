import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingComponent from 'components/Loading';

function ServerSideLoading({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  if (loading) {
    return (
      <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center">
        <LoadingComponent size={50} />
      </div>
    );
  }

  return children;
}

export default ServerSideLoading;
