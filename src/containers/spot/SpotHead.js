import { useRouter } from 'next/router';
import Head from 'next/head';

const SpotHead = ({ tokens, price }) => {
  const router = useRouter();

  let title = (
    <title>{price} | XLM-USDC | Lumenswap</title>
  );

  if (tokens) {
    title = (
      <title>{price} | {`${tokens.from.code} to ${tokens.to.code}`} | Lumenswap</title>
    );
  } else if (router.pathname.split('/').includes('custom')) {
    title = (
      <title>{price} | Custom | Lumenswap</title>
    );
  }

  return (
    <Head>
      {title}
      <meta name="description" content={`Exchange ${tokens ? `${tokens.from.code}-${tokens.to.code}` : 'assets'} in Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Price in Lumenswap.`} />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" herf={`${process.env.REACT_APP_HOST}/spot${tokens ? `/${tokens.from.code}-${tokens.to.code}` : '/custom'}`} />
    </Head>
  );
};

export default SpotHead;
