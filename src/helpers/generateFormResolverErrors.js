const generateFormResolverErrors = (errorName, errorMessage) => {
  let errors = {};
  if (!errorName && !errorMessage) {
    return errors;
  }
  errors = { [errorName]: { type: 'validate', message: errorMessage } };
  return errors;
};

export default generateFormResolverErrors;
