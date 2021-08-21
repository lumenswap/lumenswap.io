import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import NumberOnlyInput from 'components/NumberOnlyInput';
import Button from 'components/Button';
import { openModalAction } from 'actions/modal';
import ConfirmSendAsset from 'blocks/ConfirmSendAsset';
import defaultTokens from 'tokens/defaultTokens';
import isSameAsset from 'helpers/isSameAsset';
import getAssetDetails from 'helpers/getAssetDetails';
import minimizeAddress from 'helpers/minimizeAddress';
import questionLogo from '../../assets/images/question.svg';
import styles from './styles.module.scss';

const SendAsset = ({ selectedAsset }) => {
  const {
    handleSubmit,
    formState,
    control,
    setValue,
    errors,
    trigger,
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const userBalance = useSelector((state) => state.userBalance);
  const foundAsset = defaultTokens.find((i) => isSameAsset(selectedAsset, getAssetDetails(i)));
  const foundBalance = userBalance.find((balance) => isSameAsset(balance.asset, selectedAsset));

  const setMaxAmount = () => {
    setValue('amount', foundBalance.balance, { shouldValidate: true });
  };

  function onSubmit(data) {
    dispatch(
      openModalAction({
        modalProps: { title: 'Confirm sending' },
        content: <ConfirmSendAsset data={{ ...data, selectedAsset }} />,
      }),
    );
  }

  useEffect(() => {
    trigger();
  }, []);
  function generateErrors() {
    for (const error of Object.values(errors)) {
      if (error.message) {
        return error.message;
      }
    }

    return 'Send';
  }
  const validateAmount = (value) => {
    if (value <= 0) {
      return 'Amount is not valid';
    } if (value > foundBalance.balance) {
      return 'You dont have enough amount';
    }
    return true;
  };
  const validateDestination = (value) => {
    if (value[0] !== 'G' || value.length !== 56 || value.toUpperCase() !== value) {
      return 'Destination is not valid';
    }
    return true;
  };
  const validateMemo = (value) => {
    if (value?.length > 28) {
      return 'Memu is not valid';
    }
    return true;
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="destination" className="label-primary mb-1">Asset</label>
        <div className={styles['input-asset']}>
          <img src={foundAsset ? foundAsset.logo : questionLogo} width={26} height={26} alt="logo" />
          <span className={styles['asset-name']}>{selectedAsset.code}</span>
          <span className={styles['asset-web']}>{foundAsset ? foundAsset.web : minimizeAddress(selectedAsset.issuer)}</span>
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="amount" className="label-primary d-flex justify-content-between mb-1">
          Amount
          <span onClick={setMaxAmount} className={styles.max}>Max</span>
        </label>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: 'Amount is required',
            validate: (value) => validateAmount(value),
          }}
          render={(props) => (
            <NumberOnlyInput
              placeholder="0.0"
              className={styles.numberInput}
              {...props}
            />
          )}
        />

      </div>
      <div className="form-group mb-3">
        <label htmlFor="destination" className="label-primary mb-1">Destination</label>
        <Controller
          name="destination"
          type="text"
          height={48}
          fontSize={20}
          control={control}
          rules={{
            required: 'Destination is required',
            validate: (value) => validateDestination(value),
          }}
          render={(props) => (
            <Input
              {...props}
              placeholder="G ..."
            />
          )}
        />

      </div>
      <div className="form-group mb-4">
        <label htmlFor="memo" className="label-primary mb-1">Memo <span className="label-optional">(optional)</span></label>
        <Controller
          name="memo"
          control={control}
          rules={{
            validate: (value) => validateMemo(value),
          }}
          render={(props) => (
            <NumberOnlyInput
              {...props}
              className={styles.numberInput}
              autoFocus
            />
          )}
        />
      </div>
      <Button
        htmlType="submit"
        variant="primary"
        content={generateErrors()}
        className={styles.btn}
        disabled={!formState.isValid || formState.isValidating}
      />
    </form>
  );
};

export default SendAsset;
