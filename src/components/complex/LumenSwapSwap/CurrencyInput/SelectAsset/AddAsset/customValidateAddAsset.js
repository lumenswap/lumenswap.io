import { checkAssetAPI } from 'api/stellar';
import { getAssetDetails, isSameAsset, pureTokens } from 'helpers/asset';
import generateFormResolverErrors from 'helpers/generateFormResolverErrors';

async function customValidateAddNewAsset(formValues, userCustomTokens, defaultTokens) {
  const { issuer, code } = formValues;
  if (!issuer || issuer === '' || !code || code === '') {
    return { values: formValues, errors: generateFormResolverErrors('code', 'Add asset') };
  }

  const res = await checkAssetAPI(code, issuer);
  if (res) {
    const pured = pureTokens([
      ...defaultTokens.filter((i) => !i.isHide).map((i) => getAssetDetails(i)),
      ...userCustomTokens,
    ]);
    const found = pured.find((i) => isSameAsset(getAssetDetails({ issuer, code }), i));
    if (found) {
      return { values: formValues, errors: generateFormResolverErrors('code', 'Already Added') };
    }
    return { values: formValues, errors: generateFormResolverErrors() };
  }

  return { values: formValues, errors: generateFormResolverErrors('code', 'Invalid Asset') };
}

export default customValidateAddNewAsset;
