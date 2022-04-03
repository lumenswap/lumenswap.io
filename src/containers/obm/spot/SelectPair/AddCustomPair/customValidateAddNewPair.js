import { checkAssetAPI } from 'api/stellar';
import purePairs from 'containers/obm/spot/SelectPair/purePairs';
import { getAssetDetails, isSamePair } from 'helpers/asset';
import StellarSDK from 'stellar-sdk';
import generateFormResolverErrors from 'helpers/generateFormResolverErrors';
import createPairForDefaultTokens from 'containers/obm/spot/SelectPair/createPairForDefaultTokens';

async function customValidateAddNewPair(formValues, userCustomPairs) {
  if (!formValues.baseNativeCheckbox && !!formValues.baseCode && !!formValues.baseIssuer) {
    const res = await checkAssetAPI(formValues.baseCode, formValues.baseIssuer);
    if (!res) {
      return { values: formValues, errors: generateFormResolverErrors('baseCode', 'Base Asset is Invalid') };
    }
  }

  if (!formValues.counterNativeCheckbox
        && !!formValues.counterCode && !!formValues.counterIssuer) {
    const res = await checkAssetAPI(formValues.counterCode, formValues.counterIssuer);
    if (!res) {
      return { values: formValues, errors: generateFormResolverErrors('baseCode', 'Counter Asset is Invalid') };
    }
  }

  if (formValues.baseNativeCheckbox && formValues.counterNativeCheckbox) {
    return { values: formValues, errors: generateFormResolverErrors('baseCode', 'Both side cannot be same') };
  }

  if (!formValues.baseNativeCheckbox && (!formValues.baseCode || !formValues.baseIssuer)) {
    return { values: formValues, errors: generateFormResolverErrors('baseCode', 'Base Asset is Required') };
  }

  if (!formValues.counterNativeCheckbox
        && (!formValues.counterCode || !formValues.counterIssuer)) {
    return { values: formValues, errors: generateFormResolverErrors('baseCode', 'Counter Asset is Required') };
  }

  if (!formValues.baseNativeCheckbox && !formValues.counterNativeCheckbox) {
    if (formValues.baseCode === formValues.counterCode
          && formValues.baseIssuer === formValues.counterIssuer) {
      return { values: formValues, errors: generateFormResolverErrors('baseCode', 'Both side cannot be same') };
    }
  }

  const pured = purePairs([
    ...createPairForDefaultTokens(),
    ...userCustomPairs,
  ]);
  let base = getAssetDetails({
    code: formValues.baseCode,
    issuer: formValues.baseIssuer,
  });
  let counter = getAssetDetails({
    code: formValues.counterCode,
    issuer: formValues.counterIssuer,
  });
  if (formValues.baseNativeCheckbox) {
    base = StellarSDK.Asset.native();
  } else if (formValues.counterNativeCheckbox) {
    counter = StellarSDK.Asset.native();
  }
  const found = pured.find((i) => isSamePair({ base, counter }, i));
  if (found) {
    return { values: formValues, errors: generateFormResolverErrors('baseCode', 'Already exist') };
  }

  return { values: formValues, errors: generateFormResolverErrors() };
}

export default customValidateAddNewPair;
