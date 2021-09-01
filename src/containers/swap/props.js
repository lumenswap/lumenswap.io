import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import getAssetDetails from 'helpers/getAssetDetails';
import urlMaker from 'helpers/urlMaker';
import { isDefaultCode, extractTokenFromCode } from 'helpers/defaultTokenUtils';
import { checkAssetValidation } from 'api/tokens';

const tokensValid = (tokenString) => tokenString.split('-').length === 2;
const customTokenValidation = (tokenString) => {
  const extracted = tokenString.split('-');
  if (extracted.length === 1 && isDefaultCode(extracted[0])) {
    return {
      result: true,
      token: extractTokenFromCode(extracted[0]),
    };
  }
  if (isDefaultCode(extracted[0])) {
    return {
      result: true,
      token: extractTokenFromCode(extracted[0]),
      redirect: true,
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
      isSameAsset(
        getAssetDetails(fromTokenDetails),
        getAssetDetails(toTokenDetails),
      )
    ) {
      return redirectObj;
    }

    return {
      redirect: {
        destination: urlMaker.swap.custom(
          {
            ...fromTokenDetails,
            isDefault: true,
          },
          {
            ...toTokenDetails,
            isDefault: true,
          },
        ),
        permanent: true,
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

    if (fromResult.redirect || toResult.redirect) {
      const customFromCode = context.query.tokens.split('-')[0];
      const customFromIssuer = context.query.tokens.split('-')[1];
      const customToCode = context.query.customTokens.split('-')[0];
      const customToIssuer = context.query.customTokens.split('-')[1];

      return {
        redirect: {
          destination: urlMaker.swap.hard(
            `${fromResult.token ? fromResult.token.code : customFromCode}${
              !fromResult.token ? `-${customFromIssuer}` : ''
            }/${toResult.token ? toResult.token.code : customToCode}${
              !toResult.token ? `-${customToIssuer}` : ''
            }`,
          ),
          // or just redirect to root. need confirmation on this.
        },
      };
    }

    const fromCode = fromResult.token
      ? fromResult.token.code
      : context.query.tokens.split('-')[0];
    const fromIssuer = fromResult.token
      ? fromResult.token.issuer
      : context.query.tokens.split('-')[1];

    const toCode = toResult.token
      ? toResult.token.code
      : context.query.customTokens.split('-')[0];
    const toIssuer = toResult.token
      ? toResult.token.issuer
      : context.query.customTokens.split('-')[1];

    if (
      fromCode.toUpperCase() !== context.query.tokens.split('-')[0]
      || toCode.toUpperCase() !== context.query.customTokens.split('-')[0]
    ) {
      return {
        redirect: {
          destination: urlMaker.swap.custom(
            { code: fromCode.toUpperCase() },
            { code: toCode.toUpperCase() },
          ),
        },
      };
    }

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

      const fromAsset = JSON.parse(
        JSON.stringify({
          ...from,
          isDefault: isDefaultCode(from.code),
        }),
      );

      const toAsset = JSON.parse(
        JSON.stringify({
          ...to,
          isDefault: isDefaultCode(to.code),
        }),
      );

      let checkedAssetStatus;
      if (fromAsset.isDefault && !toAsset.isDefault) {
        checkedAssetStatus = await Promise.all([
          checkAssetValidation(toAsset.code, toAsset.issuer),
        ]);
      } else if (toAsset.isDefault && !fromAsset.isDefault) {
        checkedAssetStatus = await Promise.all([
          checkAssetValidation(fromAsset.code, fromAsset.issuer),
        ]);
      } else if (!toAsset.isDefault && !fromAsset.isDefault) {
        checkedAssetStatus = await Promise.all([
          checkAssetValidation(fromAsset.code, fromAsset.issuer),
          checkAssetValidation(toAsset.code, toAsset.issuer),
        ]);
      } else {
        checkedAssetStatus = [true, true];
      }

      if (!checkedAssetStatus.every((i) => i)) {
        return {
          redirect: {
            destination: urlMaker.swap.tokens('XLM', 'USDC'),
          },
        };
      }

      return {
        props: {
          custom: {
            from: fromAsset,
            to: toAsset,
          },
        },
      };
    } catch (error) {
      console.log(error);
      return redirectObj;
    }
  }

  return redirectObj;
}
