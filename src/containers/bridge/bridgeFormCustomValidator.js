import walletValidator from 'multicoin-address-validator';
import generateFormResolverErrors from 'helpers/generateFormResolverErrors';
import BN from 'helpers/BN';
import { getAssetDetails, isSameAsset } from 'helpers/asset';
import { fetchAccountFullDetails } from 'api/stellar';
import { TOKEN_A_FORM_NAME, TOKEN_B_FORM_NAME } from './tokenFormNames';

async function bridgeFormCustomValidator(formValues, userBalances) {
  const currentToToken = formValues[TOKEN_B_FORM_NAME];
  const currentFromToken = formValues[TOKEN_A_FORM_NAME];
  if (currentFromToken.network === 'stellar' && userBalances) {
    const foundAssetInUserBalances = userBalances?.find((balance) => isSameAsset(balance.asset,
      getAssetDetails({ code: currentFromToken.name, issuer: process.env.REACT_APP_L_ISSUER })));
    const fromAssetUserAmount = foundAssetInUserBalances?.balance ?? 0;
    if (new BN(formValues.amount).gt(fromAssetUserAmount)) {
      return { values: formValues, errors: generateFormResolverErrors('amount', 'Insufficient amount') };
    }
  }
  if (!formValues.amount || formValues.amount === '') {
    return { values: formValues, errors: generateFormResolverErrors('amount', 'Amount is required') };
  }
  if (new BN(formValues.amount).isEqualTo(0)) {
    return { values: formValues, errors: generateFormResolverErrors('amount', 'Invalid amount') };
  }
  if (!new BN(formValues.amount).gte(currentFromToken.minimum_amount)) {
    return { values: formValues, errors: generateFormResolverErrors('amount', `Minimum amount is ${currentFromToken.minimum_amount}`) };
  }
  if (!formValues.destination || formValues.destination === '') {
    return { values: formValues, errors: generateFormResolverErrors('destination', 'Address is required') };
  }

  const isValidatedAddress = walletValidator.validate(formValues.destination,
    currentToToken.network);
  if (!isValidatedAddress) {
    return { values: formValues, errors: generateFormResolverErrors('address', 'Address is invalid') };
  }
  if (currentToToken.network === 'stellar' && formValues.destination.length === 56) {
    const destinationFullDetails = await fetchAccountFullDetails(formValues.destination);
    const foundAssetInUserBalances = destinationFullDetails.data.balances
      .filter((balance) => (balance.asset_type === 'credit_alphanum4' && balance.asset_type === 'credit_alphanum12'))
      .find((balance) => isSameAsset(getAssetDetails({
        code: balance.asset_code,
        issuer: balance.asset_issuer,
      }),
      getAssetDetails({ code: currentToToken.name, issuer: process.env.REACT_APP_L_ISSUER })));
    if (!foundAssetInUserBalances) {
      return { values: formValues, errors: generateFormResolverErrors('destination', `There is no trustline for ${currentToToken.name}`) };
    }
  }

  return { values: formValues, errors: generateFormResolverErrors() };
}

export default bridgeFormCustomValidator;
