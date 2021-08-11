import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import getAssetDetails from 'helpers/getAssetDetails';

const tokensValid = (tokenString) => tokenString.split('-').length === 2;
export async function swapPageGetServerSideProps(context) {
  const { req } = context;
  let host;
  if (req) {
    host = req.headers.host;
  }

  const redirectObj = {
    redirect: {
      destination: '/swap',
      permanent: true,
    },
  };

  if (context.query.tokens) {
    const tokens = context.query.tokens;

    if (!tokensValid(tokens)) {
      return redirectObj;
    }

    const fromToken = tokens.split('-')[0];
    const toToken = tokens.split('-')[1];

    const tokenCodes = defaultTokens.map((token) => token.code.toLowerCase());

    if (
      !tokenCodes.includes(fromToken.toLowerCase())
      || !tokenCodes.includes(toToken.toLowerCase())
    ) {
      return redirectObj;
    }

    const fromTokenDetails = defaultTokens.find(
      (token) => token.code.toLowerCase() === fromToken.toLowerCase(),
    );
    const toTokenDetails = defaultTokens.find(
      (token) => token.code.toLowerCase() === toToken.toLowerCase(),
    );

    if (
      fromToken.toUpperCase() !== fromToken
      || toToken.toUpperCase() !== toToken
    ) {
      return {
        redirect: {
          destination: `/swap/${fromToken.toUpperCase()}-${toToken.toUpperCase()}`,
          permanent: true,
        },
      };
    }

    if (isSameAsset(getAssetDetails(fromTokenDetails), getAssetDetails(toTokenDetails))) {
      return redirectObj;
    }

    return {
      props: {
        tokens: {
          from: fromTokenDetails,
          to: toTokenDetails,
        },
        hostname: host,

      },
    };
  }

  return {
    props: {
      hostname: host,
    },
  };
}
