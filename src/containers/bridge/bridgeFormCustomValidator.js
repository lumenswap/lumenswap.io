import walletValidator from 'multicoin-address-validator';
import generateFormResolverErrors from 'helpers/generateFormResolverErrors';
import { TOKEN_A_FORM_NAME } from './tokenFormNames';

function bridgeFormCustomValidator(formValues) {
  if (!formValues.amount || formValues.amount === '') {
    return { values: formValues, errors: generateFormResolverErrors('amount', 'Amount is required') };
  }
  if (!formValues.destination || formValues.destination === '') {
    return { values: formValues, errors: generateFormResolverErrors('destination', 'Address is required') };
  }
  const currentFromToken = formValues[TOKEN_A_FORM_NAME];
  const isValidatedAddress = walletValidator.validate(formValues.destination,
    currentFromToken.network);
  if (!isValidatedAddress) {
    return { values: formValues, errors: generateFormResolverErrors('address', 'Address is invalid') };
  }

  return { values: formValues, errors: generateFormResolverErrors() };
}

export default bridgeFormCustomValidator;
