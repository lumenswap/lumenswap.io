const generateFormResolverErrors = {
  errors: {},
  setError(errorName, errorMessage) {
    this.errors = { [errorName]: { type: 'validate', message: errorMessage } };
    return this.errors;
  },
  clearErrors() {
    this.errors = {};
    return this.errors;
  },
};

export default generateFormResolverErrors;
