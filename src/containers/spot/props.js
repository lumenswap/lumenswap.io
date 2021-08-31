import createPairForDefaultTokens from 'blocks/SelectPair/createPairForDefaultTokens';
import urlMaker from 'helpers/urlMaker';
import defaultTokens from 'tokens/defaultTokens';
import { isDefaultCode, extractTokenFromCode } from 'helpers/defaultTokenUtils';
import getAssetDetails from 'helpers/getAssetDetails';

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
export async function spotPageGetServerSideProps(context) {
  const createdDefaultPairs = createPairForDefaultTokens();
  const redirectObj = {
    redirect: {
      destination: urlMaker.spot.tokens('XLM', 'USDC'),
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

    const tokenPairCodes = createdDefaultPairs.map((pair) => {
      const pairCodes = {
        base: pair.base.code,
        counter: pair.counter.code,
      };

      return pairCodes;
    });

    const found = tokenPairCodes.find(
      (pair) => pair.base === fromToken && pair.counter === toToken,
    );

    if (!found) return redirectObj;

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
          destination: urlMaker.spot.tokens(
            fromToken.toUpperCase(),
            toToken.toUpperCase(),
          ),
          permanent: true,
        },
      };
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

  return redirectObj;
}

export async function customSpotPageGetServerSideProps(context) {
  const redirectObj = {
    redirect: {
      destination: urlMaker.spot.root(),
    },
  };
  if (context.query.tokens && context.query.customCounterToken) {
    const fromResult = customTokenValidation(context.query.tokens);
    const toResult = customTokenValidation(context.query.customCounterToken);

    if (!fromResult.result || !toResult.result) {
      return redirectObj;
    }

    const fromCode = fromResult.token ? fromResult.token.code : context.query.tokens.split('-')[0];
    const fromIssuer = fromResult.token ? fromResult.token.issuer : context.query.tokens.split('-')[1];

    const toCode = toResult.token ? toResult.token.code : context.query.customCounterToken.split('-')[0];
    const toIssuer = toResult.token ? toResult.token.issuer : context.query.customCounterToken.split('-')[1];

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
            base: JSON.parse(JSON.stringify({
              ...from,
              isDefault: isDefaultCode(from.code),
            })),
            counter: JSON.parse(JSON.stringify({
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
