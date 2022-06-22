import Button from 'components/Button';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { getAssetDetails } from 'helpers/asset';
import StellarSDK from 'stellar-sdk';
import Submitting from 'components/Submitting';
import { useEffect } from 'react';
import { addCustomPairAction } from 'actions/userCustomPairs';
import { closeModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import customValidateAddNewPair from './customValidateAddNewPair';
import styles from './styles.module.scss';

const AddCustomPair = ({ createdDefaultPairs }) => {
  const userCustomPairs = useSelector((state) => state.userCustomPairs);

  const {
    handleSubmit,
    formState,
    trigger,
    control,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: (formValues) => customValidateAddNewPair(formValues, userCustomPairs,
      createdDefaultPairs),
  });
  const dispatch = useDispatch();

  function onSubmit(formData) {
    let base = getAssetDetails({
      code: formData.baseCode,
      issuer: formData.baseIssuer,
    });
    let counter = getAssetDetails({
      code: formData.counterCode,
      issuer: formData.counterIssuer,
    });
    if (formData.baseNativeCheckbox) {
      base = StellarSDK.Asset.native();
    } else if (formData.counterNativeCheckbox) {
      counter = StellarSDK.Asset.native();
    }

    dispatch(addCustomPairAction({ base, counter }));
    dispatch(closeModalAction());
  }

  useEffect(() => {
    trigger();
  }, [useWatch({ control })]);

  function generateSubmitButtonContent() {
    for (const error of Object.values(formState.errors)) {
      if (error.message) {
        return error.message;
      }
    }

    return 'Add Pair';
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Base asset code</label>
        <Controller
          name="baseCode"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="USD"
              id="code1"
              height={40}
              fontSize={16}
              autoFocus
              onChange={field.onChange}
              value={field.value}
              disabled={watch('baseNativeCheckbox')}
            />
          )}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Base asset issuer</label>
        <Controller
          name="baseIssuer"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="G..."
              id="issuer1"
              height={40}
              fontSize={16}
              onChange={field.onChange}
              value={field.value}
              disabled={watch('baseNativeCheckbox')}
            />
          )}
        />
      </div>
      <div className="form-group mb-3">
        <div className={styles.checkbox}>
          <Controller
            name="baseNativeCheckbox"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                value={field.value}
                onChange={field.onChange}
                size={24}
                label="Base asset is Native (XLM)"
              />
            )}
          />
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Counter asset code</label>
        <Controller
          name="counterCode"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="USD"
              id="code2"
              height={40}
              fontSize={16}
              onChange={field.onChange}
              value={field.value}
              disabled={watch('counterNativeCheckbox')}
            />
          )}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Counter asset issuer</label>
        <Controller
          name="counterIssuer"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="G..."
              id="issuer2"
              height={40}
              fontSize={16}
              onChange={field.onChange}
              value={field.value}
              disabled={watch('counterNativeCheckbox')}
            />
          )}
        />
      </div>
      <div className="form-group mb-4">
        <div className={styles.checkbox}>
          <Controller
            name="counterNativeCheckbox"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                value={field.value}
                onChange={field.onChange}
                size={24}
                label="Counter asset is Native (XLM)"
              />
            )}
          />
        </div>
      </div>
      <Button
        htmlType="submit"
        fontWeight={600}
        variant="primary"
        className={styles.btn}
        content={formState.isValidating ? <Submitting loadingSize={21} />
          : generateSubmitButtonContent()}
        disabled={!formState.isValid || formState.isValidating}
      />
    </form>
  );
};

export default AddCustomPair;
