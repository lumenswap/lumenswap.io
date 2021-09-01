import StellarSDK from 'stellar-sdk';

import createPairForDefaultTokens from 'blocks/SelectPair/createPairForDefaultTokens';
import urlMaker from 'helpers/urlMaker';
import defaultTokens from 'tokens/defaultTokens';
import { isDefaultCode, extractTokenFromCode } from 'helpers/defaultTokenUtils';
import getAssetDetails from 'helpers/getAssetDetails';
import { checkAssetValidation } from 'api/tokens';
import isSameAsset from 'helpers/isSameAsset';

const tokensValid = (tokenString) => tokenString.split('-').length === 2;
const customTokenValidation = (tokenString) => {
  const extracted = tokenString.split('-');
  if (extracted.length === 1 && isDefaultCode(extracted[0])) {
    return {
      result: true,
      token: extractTokenFromCode(extracted[0]),
      isDefault: true,
    };
  }
  if (
    isDefaultCode(extracted[0])
    && extracted[1] === extractTokenFromCode(extracted[0]).issuer
  ) {
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
      isSameAsset(
        getAssetDetails(fromTokenDetails),
        getAssetDetails(toTokenDetails),
      )
    ) {
      return redirectObj;
    }

    return {
      redirect: {
        destination: urlMaker.spot.custom(
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

export async function customSpotPageGetServerSideProps(context) {
  const redirectObj = {
    redirect: {
      destination: urlMaker.spot.tokens('XLM', 'USDC'),
    },
  };
  if (context.query.tokens && context.query.customCounterToken) {
    const fromResult = customTokenValidation(context.query.tokens);
    const toResult = customTokenValidation(context.query.customCounterToken);

    const queryFromIssuer = context.query.tokens.split('-')[1];
    const queryToIssuer = context.query.customCounterToken.split('-')[1];

    if (!fromResult.result || !toResult.result) {
      return redirectObj;
    }

    if (fromResult.redirect || toResult.redirect) {
      const customFromCode = context.query.tokens.split('-')[0];
      const customFromIssuer = context.query.tokens.split('-')[1];
      const customToCode = context.query.customCounterToken.split('-')[0];
      const customToIssuer = context.query.customCounterToken.split('-')[1];

      return {
        redirect: {
          destination: urlMaker.spot.hard(
            `${fromResult.token ? fromResult.token.code : customFromCode}${
              !fromResult.token ? `-${customFromIssuer}` : ''
            }/${toResult.token ? toResult.token.code : customToCode}${
              !toResult.token ? `-${customToIssuer}` : ''
            }`,
          ),
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
      : context.query.customCounterToken.split('-')[0];
    const toIssuer = toResult.token
      ? toResult.token.issuer
      : context.query.customCounterToken.split('-')[1];

    if (
      fromCode.toUpperCase() !== context.query.tokens.split('-')[0]
      || toCode.toUpperCase() !== context.query.customCounterToken.split('-')[0]
    ) {
      if (
        (queryFromIssuer
          && queryFromIssuer.toUpperCase() !== queryFromIssuer)
        || (queryToIssuer && queryToIssuer.toUpperCase() !== queryToIssuer)
      ) {
        const checkedFromIssuer = fromResult.isDefault
          ? null
          : fromIssuer.toUpperCase();
        const checkedToIssuer = toResult.isDefault
          ? null
          : toIssuer.toUpperCase();

        return {
          redirect: {
            destination: urlMaker.swap.custom(
              { code: fromCode.toUpperCase(), issuer: checkedFromIssuer },
              { code: toCode.toUpperCase(), issuer: checkedToIssuer },
            ),
          },
        };
      }

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
      if (queryFromIssuer) {
        if (!StellarSDK.StrKey.isValidEd25519PublicKey(queryFromIssuer)) { return redirectObj; }
      }

      if (queryToIssuer) {
        if (!StellarSDK.StrKey.isValidEd25519PublicKey(queryToIssuer)) { return redirectObj; }
      }

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

      if (isSameAsset(from, to)) {
        return redirectObj;
      }

      const base = JSON.parse(
        JSON.stringify({
          ...from,
          isDefault: isDefaultCode(from.code),
        }),
      );

      const counter = JSON.parse(
        JSON.stringify({
          ...to,
          isDefault: isDefaultCode(to.code),
        }),
      );

      let checkedAssetStatus;
      if (base.isDefault && !counter.isDefault) {
        checkedAssetStatus = await Promise.all([
          checkAssetValidation(counter.code, counter.issuer),
        ]);
      } else if (counter.isDefault && !base.isDefault) {
        checkedAssetStatus = await Promise.all([
          checkAssetValidation(base.code, base.issuer),
        ]);
      } else if (!base.isDefault && !counter.isDefault) {
        checkedAssetStatus = await Promise.all([
          checkAssetValidation(base.code, base.issuer),
          checkAssetValidation(counter.code, counter.issuer),
        ]);
      } else {
        checkedAssetStatus = [true, true];
      }

      if (!checkedAssetStatus.every((i) => i)) {
        return redirectObj;
      }

      return {
        props: {
          custom: {
            base,
            counter,
          },
        },
      };
    } catch (error) {
      return redirectObj;
    }
  }

  return redirectObj;
}
