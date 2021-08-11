import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const SpotHead = ({ tokens, hostname, price }) => {
  const router = useRouter();
  const [title, setTitle] = useState(<></>);
  let protocol;
  if (typeof window !== 'undefined') {
    protocol = window.location.protocol;
  }

  useEffect(() => {
    setTitle(
      <title>{price} | XLM-USDC | Lumenswap</title>,
    );

    if (tokens) {
      setTitle(
        <title>{price} | {`${tokens.from.code} to ${tokens.to.code}`} | Lumenswap</title>,
      );
    } else if (router.pathname.split('/').includes('custom')) {
      setTitle(
        <title>{price} | Custom | Lumenswap</title>,
      );
    }
  }, [price]);

  return (
    <Head>
      {title}
      <meta name="description" content="Exchange LPS-XLM in Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Price in Lumenswap." />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" herf={`${protocol}//${hostname}${router.pathname}`} />
    </Head>
  );
};

export default SpotHead;
