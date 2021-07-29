import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  // redirect client-side
  //  | | |
  // V V V
  useEffect(() => {
    const { pathname } = router;
    if (pathname === '/') router.push('/swap');
  });

  // can also do server-side redirect using getServerSideProps. Need to talk about this issue.

  return (
    <></>
  );
}
