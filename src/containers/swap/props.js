import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import getAssetDetails from 'helpers/getAssetDetails';
import urlMaker from 'helpers/urlMaker';

const tokensValid = (tokenString) => tokenString.split('-').length === 2;
export async function swapPageGetServerSideProps(context) {
  const redirectObj = {
    redirect: {
      destination: urlMaker.swap.root(),
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
          destination: urlMaker.swap.tokens(fromToken.toUpperCase(), toToken.toUpperCase()),
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

      },
    };
  }

  return {
    props: {
    },
  };
}
