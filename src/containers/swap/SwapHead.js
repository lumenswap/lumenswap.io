import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

const SwapHead = ({ tokens }) => {
  const router = useRouter();

  let title = (
    <title>Lumenswap | Swap</title>
  );

  let pathname = '/';

  if (tokens) {
    title = (
      <title>
        Swap {`${tokens.from.code} to ${tokens.to.code}`} | Lumenswap
      </title>
    );
    pathname = `/${tokens.from.code}-${tokens.to.code}`;
  } else if (router.pathname.split('/').includes('custom')) {
    title = (
      <title>
        Swap Custom | Lumenswap
      </title>
    );
    pathname = '/custom';
  }

  return (
    <Head>
      {title}
      <meta name="description" content={`Swapping ${tokens ? `${tokens.from.code}-${tokens.to.code}` : 'assets'} | Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Prices in Lumenswas`} />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" herf={`${process.env.REACT_APP_HOST}/swap${pathname}`} />
    </Head>
  );
};

export default SwapHead;
