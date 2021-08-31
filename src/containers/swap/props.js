import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import getAssetDetails from 'helpers/getAssetDetails';
import urlMaker from 'helpers/urlMaker';
import { isDefaultCode, extractTokenFromCode } from 'helpers/defaultTokenUtils';

const tokensValid = (tokenString) => tokenString.split('-').length === 2;
const customTokenValidation = (tokenString) => {
  const extracted = tokenString.split('-');
  if (extracted.length === 1 && isDefaultCode(extracted[0])) {
    return {
      result: true,
      token: extractTokenFromCode(extracted[0]),
    };
  }
  return {
    result: tokenString.split('-').length === 2,
  };
};
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
          destination: urlMaker.swap.tokens(
            fromToken.toUpperCase(),
            toToken.toUpperCase(),
          ),
          permanent: true,
        },
      };
    }

    if (
      isSameAsset(
        getAssetDetails(fromTokenDetails),
        getAssetDetails(toTokenDetails),
      )
    ) {
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
    props: {},
  };
}

export async function swapCustomTokenGetServerSideProps(context) {
  const redirectObj = {
    redirect: {
      destination: urlMaker.swap.root(),
    },
  };
  if (context.query.tokens && context.query.customTokens) {
    const fromResult = customTokenValidation(context.query.tokens);
    const toResult = customTokenValidation(context.query.customTokens);

    if (!fromResult.result || !toResult.result) {
      return redirectObj;
    }

    const fromCode = fromResult.token ? fromResult.token.code : context.query.tokens.split('-')[0];
    const fromIssuer = fromResult.token ? fromResult.token.issuer : context.query.tokens.split('-')[1];

    const toCode = toResult.token ? toResult.token.code : context.query.customTokens.split('-')[0];
    const toIssuer = toResult.token ? toResult.token.issuer : context.query.customTokens.split('-')[1];

    try {
      const from = getAssetDetails({
        code: fromCode,
        issuer: fromIssuer,
        type: fromCode === 'XLM' ? 'native' : null,
      });

      from.logo = fromResult.token && fromResult.token.logo;

      const to = getAssetDetails({
        code: toCode,
        issuer: toIssuer,
        type: toCode === 'XLM' ? 'native' : null,

      });
      to.logo = toResult.token && toResult.token.logo;

      return {
        props: {
          custom: {
            from: JSON.parse(JSON.stringify({
              ...from,
              isDefault: isDefaultCode(from.code),
            })),
            to: JSON.parse(JSON.stringify({
              ...to,
              isDefault: isDefaultCode(to.code),
            })),
          },
        },
      };
    } catch (error) {
      console.log(error.message);
      return redirectObj;
    }
  }

  return redirectObj;
}
