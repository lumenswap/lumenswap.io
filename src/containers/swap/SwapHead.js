import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

const SwapHead = ({ tokens }) => {
  const router = useRouter();
  let headTitle = 'Swap | Lumenswap';
  let pathname = '';

  if (tokens) {
    headTitle = `Swap ${tokens.from.code} to ${tokens.to.code} | Lumenswap`;
    pathname = `${tokens.from.code}-${tokens.to.code}`;
  } else if (router.pathname.split('/').includes('custom')) {
    headTitle = 'Swap Custom | Lumenswap';
    pathname = 'custom';
  }

  return (
    <Head>
      <title>{headTitle}</title>
      <meta name="description" content={`Swapping ${tokens ? `${tokens.from.code}-${tokens.to.code}` : 'assets'} | Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Prices in Lumenswas`} />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" herf={`${process.env.REACT_APP_HOST}/swap${pathname}`} />
    </Head>
  );
};

export default SwapHead;
