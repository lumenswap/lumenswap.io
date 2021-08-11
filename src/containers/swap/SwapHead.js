import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

const SwapHead = ({ tokens, hostname }) => {
  const router = useRouter();
  let protocol;
  if (typeof window !== 'undefined') {
    protocol = window.location.protocol;
  }

  let title = (
    <title>Lumenswap | Swap</title>
  );

  if (tokens) {
    title = (
      <title>
        Swap {`${tokens.from.code} to ${tokens.to.code}`} | Lumenswap
      </title>
    );
  } else if (router.pathname.split('/').includes('custom')) {
    title = (
      <title>
        Swap Custom | Lumenswap
      </title>
    );
  }

  return (
    <Head>
      {title}
      <meta name="description" content="Swapping LPS-XLM | Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Prices in Lumenswap" />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" herf={`${protocol}//${hostname}${router.pathname}`} />
    </Head>
  );
};

export default SwapHead;
