import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import urlMaker from 'helpers/urlMaker';

const SwapHead = ({ tokens, custom }) => {
  let headTitle = 'Swap | Lumenswap';
  let pathname = '';

  if (tokens) {
    headTitle = `Swap ${tokens.from.code} to ${tokens.to.code} | Lumenswap`;
    pathname = `${tokens.from.code}-${tokens.to.code}`;
  } else if (custom) {
    headTitle = `Swap ${custom.from.code} to ${custom.to.code} | Lumenswap`;
  }

  return (
    <Head>
      <title>{headTitle}</title>
      <meta name="description" content={`Swapping ${tokens ? `${tokens.from.code}-${tokens.to.code}` : 'assets'} | Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Prices in Lumenswas`} />
      <meta name="robots" content="follow, index" />
      {custom
        ? <link rel="canonical" herf={`${process.env.REACT_APP_HOST}${urlMaker.swap.custom(custom.from, custom.to)}`} />
        : <link rel="canonical" herf={`${process.env.REACT_APP_HOST}${urlMaker.swap.root()}${pathname}`} />}
    </Head>
  );
};

export default SwapHead;
