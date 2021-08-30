import { useRouter } from 'next/router';
import Head from 'next/head';
import numeral from 'numeral';
import urlMaker from 'helpers/urlMaker';

const SpotHead = ({ tokens, price }) => {
  const router = useRouter();
  const formattedPrice = numeral(price).format('0.[00]');
  let pageTitle = `${formattedPrice} | XLM-USDC | Lumenswap`;

  let pricePiece = '';
  if (price) {
    pricePiece = `${formattedPrice} | `;
  }

  if (tokens) {
    pageTitle = `${pricePiece}${tokens.from.code} to ${tokens.to.code} | Lumenswap`;
  } else if (router.pathname.split('/').includes('custom')) {
    pageTitle = `${pricePiece}Custom | Lumenswap`;
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={`Exchange ${tokens ? `${tokens.from.code}-${tokens.to.code}` : 'custom pair'} in Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Price in Lumenswap.`} />
      <meta name="robots" content="follow, index" />
      <link rel="canonical" herf={`${process.env.REACT_APP_HOST}${tokens ? urlMaker.spot.tokens(tokens.from.code, tokens.to.code) : urlMaker.spot.custom()}`} />
    </Head>
  );
};

export default SpotHead;
