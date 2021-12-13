import Head from 'next/head';
import numeral from 'numeral';
import urlMaker from 'helpers/urlMaker';

const SpotHead = ({ price, custom }) => {
  const formattedPrice = numeral(price).format('0.[00]');
  let pageTitle = `${formattedPrice} | XLM-USDC | Lumenswap`;

  let pricePiece = '';
  if (price) {
    pricePiece = `${formattedPrice} | `;
  }
  // if (tokens) {
  //   pageTitle = `${pricePiece}${tokens.from.code} to ${tokens.to.code} | Lumenswap`;
  // } else

  if (custom) {
    pageTitle = `${pricePiece}${custom.base.code} to ${custom.counter.code} | Lumenswap`;
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={`Exchange ${
          custom ? `${custom.base.code}-${custom.counter.code}` : 'custom pair'
        } in Decentralized Exchanged on Stellar | Find All Live Stellar Assets Chart, Graph and Price in Lumenswap.`}
      />
      <meta name="robots" content="follow, index" />
      <link
        rel="canonical"
        herf={`${process.env.REACT_APP_HOST}${
          custom
          && urlMaker.obm.spot.custom(
            custom.base.code,
            custom.base.issuer,
            custom.counter.code,
            custom.counter.issuer,
          )
        } `}
      />
    </Head>
  );
};

export default SpotHead;
