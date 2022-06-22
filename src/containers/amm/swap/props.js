import StellarSDK from 'stellar-sdk';
import { wrapper } from 'store';
import { isSameAsset, getAssetDetails } from 'helpers/asset';
import urlMaker from 'helpers/urlMaker';
import { isDefaultCode, extractTokenFromCode } from 'helpers/defaultTokenUtils';
import { checkAssetValidation } from 'api/tokens';

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
export const swapPageGetServerSideProps = wrapper.getServerSideProps((store) => (context) => {
  const defaultTokens = store.getState().defaultTokens;
  const redirectObj = {
    redirect: {
      destination: urlMaker.amm.swap.root(),
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
        destination: urlMaker.amm.swap.custom(
          fromTokenDetails.code,
          null,
          toTokenDetails.code,
          null,
        ),
        permanent: true,
      },
    };
  }

  return {
    props: { },
  };
});

export const swapCustomTokenGetServerSideProps = wrapper
  .getServerSideProps((store) => async (context) => {
    const defaultTokens = store.getState().defaultTokens;
    const redirectObj = {
      redirect: {
        destination: urlMaker.amm.swap.root(),
      },
    };

    const notFoundError = () => {
      context.res.statusCode = 404;
      return {
        props: { errorCode: 404, message: 'Invalid ' },
      };
    };

    if (context.query.tokens && context.query.customTokens) {
      const fromResult = customTokenValidation(context.query.tokens, defaultTokens);
      const toResult = customTokenValidation(context.query.customTokens, defaultTokens);

      const queryFromIssuer = context.query.tokens.split('-')[1];
      const queryToIssuer = context.query.customTokens.split('-')[1];

      if (!fromResult || !toResult) {
        return notFoundError();
      }

      if (fromResult.redirect || toResult.redirect) {
        return {
          redirect: {
            destination: urlMaker.amm.swap.custom(
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
            destination: urlMaker.amm.swap.custom(
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
            custom: {
              from: fromAsset,
              to: toAsset,
            },
          },
        };
      } catch (error) {
        return redirectObj;
      }
    }

    return redirectObj;
  });
