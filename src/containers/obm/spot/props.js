import StellarSDK from 'stellar-sdk';

import urlMaker from 'helpers/urlMaker';
import { isDefaultCode, extractTokenFromCode } from 'helpers/defaultTokenUtils';
import { getAssetDetails, isSameAsset } from 'helpers/asset';
import { checkAssetValidation } from 'api/tokens';
import { wrapper } from 'store';
import { getAssetPairs } from 'api/assets';

const tokensValid = (tokenString) => tokenString.split('-').length === 2;
const customTokenValidation = (tokenString, defaultTokens) => {
  const extracted = tokenString.split('-');

  if (extracted.length > 2) return null;

  if (extracted.length === 1 && isDefaultCode(extracted[0], defaultTokens)) {
    return {
      code: extracted[0],
    };
  }
  if (isDefaultCode(extracted[0], defaultTokens)) {
    const token = extractTokenFromCode(extracted[0], defaultTokens);
    const defaultIssuer = token.issuer;

    if (defaultIssuer === extracted[1]) {
      return {
        code: extracted[0],
        issuer: null,
        redirect: true,
      };
    }

    return {
      code: extracted[0],
      issuer: extracted[1],
    };
  }

  if (tokenString.split('-').length === 2) {
    return {
      code: extracted[0],
      issuer: extracted[1],
    };
  }

  return null;
};
export const spotPageGetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  try {
    const createdDefaultPairs = await getAssetPairs();
    const defaultTokens = store.getState().defaultTokens;
    const redirectObj = {
      redirect: {
        destination: urlMaker.obm.spot.custom('XLM', null, 'USDC', null),
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
          destination: urlMaker.obm.spot.custom(
            fromTokenDetails.code,
            null,
            toTokenDetails.code,
            null,
          ),
          permanent: true,
        },
      };
    }

    return redirectObj;
  } catch (err) {
    if (err?.response.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(err);
  }
});

export const customSpotPageGetServerSideProps = wrapper
  .getServerSideProps((store) => async (context) => {
    const defaultTokens = store.getState().defaultTokens;
    try {
      const createdDefaultPairs = await getAssetPairs();
      const redirectObj = {
        redirect: {
          destination: urlMaker.obm.spot.root(),
        },
      };

      const notFoundError = () => {
        context.res.statusCode = 404;
        return {
          props: { errorCode: 404, message: 'Invalid ' },
        };
      };

      if (context.query.tokens && context.query.customCounterToken) {
        const fromResult = customTokenValidation(context.query.tokens, defaultTokens);
        const toResult = customTokenValidation(context.query.customCounterToken, defaultTokens);

        const queryFromIssuer = context.query.tokens.split('-')[1];
        const queryToIssuer = context.query.customCounterToken.split('-')[1];

        if (!fromResult || !toResult) {
          return notFoundError();
        }

        if (fromResult.redirect || toResult.redirect) {
          return {
            redirect: {
              destination: urlMaker.obm.spot.custom(
                fromResult.code,
                fromResult.issuer,
                toResult.code,
                toResult.issuer,
              ),
            },
          };
        }

        if (
          (queryFromIssuer
          && queryFromIssuer.toUpperCase() !== queryFromIssuer)
        || (queryToIssuer && queryToIssuer.toUpperCase() !== queryToIssuer)
        ) {
          const checkedFromIssuer = !fromResult.issuer
            ? null
            : fromResult.issuer.toUpperCase();
          const checkedToIssuer = !toResult.issuer
            ? null
            : toResult.issuer.toUpperCase();

          return {
            redirect: {
              destination: urlMaker.obm.spot.custom(
                fromResult.code,
                checkedFromIssuer,
                toResult.code,
                checkedToIssuer,
              ),
            },
          };
        }

        try {
          if (
            (fromResult.issuer
          && !StellarSDK.StrKey.isValidEd25519PublicKey(fromResult.issuer))
        || (toResult.issuer
          && !StellarSDK.StrKey.isValidEd25519PublicKey(toResult.issuer))
          ) {
            return notFoundError();
          }

          const fromAsset = {
            ...fromResult,
            isDefault: !fromResult.issuer,
          };

          const toAsset = {
            ...toResult,
            isDefault: !toResult.issuer,
          };

          if (fromAsset.code === toAsset.code && fromAsset.issuer === toAsset.issuer) {
            return redirectObj;
          }

          let checkedAssetStatus = [true];
          const reqs = [];

          if (!fromAsset.isDefault) {
            reqs.push(checkAssetValidation(fromAsset.code, fromAsset.issuer));
          }

          if (!toAsset.isDefault) {
            reqs.push(checkAssetValidation(toAsset.code, toAsset.issuer));
          }

          if (reqs.length > 1) {
            checkedAssetStatus = await Promise.all(reqs);
          }

          if (!checkedAssetStatus.every((i) => i)) {
            return notFoundError();
          }

          return {
            props: {
              createdDefaultPairsFromServer: { createdDefaultPairs },
              custom: {
                base: fromAsset,
                counter: toAsset,
              },
            },
          };
        } catch (error) {
          return redirectObj;
        }
      }
      return redirectObj;
    } catch (err) {
      if (err?.response.status === 404) {
        return {
          notFound: true,
        };
      }
      throw new Error(err);
    }
  });
