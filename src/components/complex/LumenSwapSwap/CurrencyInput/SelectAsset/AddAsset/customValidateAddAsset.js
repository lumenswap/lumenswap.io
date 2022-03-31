import { checkAssetAPI } from 'api/stellar';
import { getAssetDetails, isSameAsset, pureTokens } from 'helpers/asset';
import generateFormResolverErrors from 'helpers/generateFormResolverErrors';
import defaultTokens from 'tokens/defaultTokens';

async function customValidateAddNewAsset(formValues, userCustomTokens) {
  const { issuer, code } = formValues;
  if (!issuer || issuer === '' || !code || code === '') {
    return { values: formValues, errors: generateFormResolverErrors.setError('code', 'Add asset') };
  }

  const res = await checkAssetAPI(code, issuer);
  if (res) {
    const pured = pureTokens([
      ...defaultTokens.filter((i) => !i.isHide).map((i) => getAssetDetails(i)),
      ...userCustomTokens,
    ]);
    const found = pured.find((i) => isSameAsset(getAssetDetails({ issuer, code }), i));
    if (found) {
      return { values: formValues, errors: generateFormResolverErrors.setError('code', 'Already Added') };
    }
    return { values: formValues, errors: generateFormResolverErrors.clearErrors() };
  }

  return { values: formValues, errors: generateFormResolverErrors.setError('code', 'Invalid Asset') };
}

export default customValidateAddNewAsset;
