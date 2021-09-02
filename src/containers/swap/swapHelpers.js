export function changeToAsset(asset, setValue, getValues) {
  const formValues = getValues();
  setValue('to', { asset, amount: formValues.to.amount });
}

export function changeFromAsset(asset, setValue, getValues) {
  const formValues = getValues();
  setValue('from', { asset, amount: formValues.to.amount });
}
