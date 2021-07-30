import Button from 'components/Button';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import { Controller, useForm } from 'react-hook-form';
import { checkAssetAPI } from 'api/stellar';
import purePairs from 'blocks/SelectPair/purePairs';
import createPairForDefaultTokens from 'blocks/SelectPair/createPairForDefaultTokens';
import store from 'store';
import isSamePair from 'helpers/isSamePair';
import getAssetDetails from 'helpers/getAssetDetails';
import StellarSDK from 'stellar-sdk';
import Submitting from 'components/Submitting';
import { useEffect } from 'react';
import { addCustomPairAction } from 'actions/userCustomPairs';
import { closeModalAction } from 'actions/modal';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

const AddCustomPair = () => {
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    errors,
    trigger,
    control,
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  function onSubmit(data) {
    let base = getAssetDetails({
      code: data.baseCode,
      issuer: data.baseIssuer,
    });
    let counter = getAssetDetails({
      code: data.counterCode,
      issuer: data.counterIssuer,
    });
    if (data.baseNativeCheckbox) {
      base = StellarSDK.Asset.native();
    } else if (data.counterNativeCheckbox) {
      counter = StellarSDK.Asset.native();
    }

    addCustomPairAction({ base, counter });
    dispatch(closeModalAction());
  }

  async function customValidator() {
    const formValues = getValues();
    if (formValues.baseNativeCheckbox && formValues.counterNativeCheckbox) {
      return 'Both side cannot be same';
    }

    if (!formValues.baseNativeCheckbox && (!formValues.baseCode || !formValues.baseIssuer)) {
      return 'Base Asset is Required';
    }

    if (!formValues.baseNativeCheckbox && !!formValues.baseCode && !!formValues.baseIssuer) {
      const res = await checkAssetAPI(formValues.baseCode, formValues.baseIssuer);
      if (!res) {
        return 'Base Asset is Invalid';
      }
    }

    if (!formValues.counterNativeCheckbox
      && (!formValues.counterCode || !formValues.counterIssuer)) {
      return 'Counter Asset is Required';
    }

    if (!formValues.counterNativeCheckbox
      && !!formValues.counterCode && !!formValues.counterIssuer) {
      const res = await checkAssetAPI(formValues.counterCode, formValues.counterIssuer);
      if (!res) {
        return 'Counter Asset is Invalid';
      }
    }

    if (!formValues.baseNativeCheckbox && !formValues.counterNativeCheckbox) {
      if (formValues.baseCode === formValues.counterCode
        && formValues.baseIssuer === formValues.counterIssuer) {
        return 'Both side cannot be same';
      }
    }

    const pured = purePairs([
      ...createPairForDefaultTokens(),
      ...store.getState().userCustomPairs,
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
      return 'Already exist';
    }

    return true;
  }

  useEffect(() => {
    trigger('baseCode');
  }, [watch('baseNativeCheckbox'), watch('counterNativeCheckbox')]);

  function extratError() {
    for (const value of Object.values(errors)) {
      if (value.message) {
        return value.message;
      }
    }

    return null;
  }

  const showError = extratError();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Base asset code</label>
        <Input
          type="text"
          placeholder="USD"
          name="baseCode"
          id="code1"
          height={40}
          fontSize={16}
          autoFocus
          onChange={() => trigger('baseCode')}
          innerRef={register({
            validate: customValidator,
          })}
          disabled={watch('baseNativeCheckbox')}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Base asset issuer</label>
        <Input
          type="text"
          placeholder="G..."
          name="baseIssuer"
          id="issuer1"
          height={40}
          fontSize={16}
          onChange={() => trigger('baseCode')}
          innerRef={register}
          disabled={watch('baseNativeCheckbox')}
        />
      </div>
      <div className="form-group mb-3">
        <div className={styles.checkbox}>
          <Controller
            name="baseNativeCheckbox"
            control={control}
            defaultValue={false}
            render={(props) => (
              <Checkbox
                value={props.value}
                onChange={props.onChange}
                size={24}
                label="Base asset is Native (XLM)"
              />
            )}
          />
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Counter asset code</label>
        <Input
          type="text"
          placeholder="USD"
          name="counterCode"
          id="code2"
          height={40}
          fontSize={16}
          onChange={() => trigger('baseCode')}
          innerRef={register}
          disabled={watch('counterNativeCheckbox')}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-secondary">Counter asset issuer</label>
        <Input
          type="text"
          placeholder="G..."
          name="counterIssuer"
          id="issuer2"
          height={40}
          fontSize={16}
          onChange={() => trigger('baseCode')}
          innerRef={register}
          disabled={watch('counterNativeCheckbox')}
        />
      </div>
      <div className="form-group mb-4">
        <div className={styles.checkbox}>
          <Controller
            name="counterNativeCheckbox"
            control={control}
            defaultValue={false}
            render={(props) => (
              <Checkbox
                value={props.value}
                onChange={props.onChange}
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
        content={formState.isValidating ? <Submitting loadingSize={21} /> : (showError || 'Add Pair')}
        disabled={!formState.isValid || formState.isValidating}
      />
    </form>
  );
};

export default AddCustomPair;
