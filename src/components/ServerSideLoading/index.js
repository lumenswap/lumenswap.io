import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingComponent from 'components/Loading';
import styles from './styles.module.scss';

function ServerSideLoading({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

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
      <div className={styles['loading-container']}>
        <LoadingComponent size={48} />
      </div>
    );
  }

  return children;
}

export default ServerSideLoading;
