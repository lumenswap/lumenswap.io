import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/Input';
import { useEffect } from 'react';
import NumberOnlyInput from 'components/NumberOnlyInput';
import Button from 'components/Button';
import { openModalAction } from 'actions/modal';
import {
  isSameAsset, getAssetDetails, calculateMaxXLM, extractInfoByToken,
} from 'helpers/asset';
import { isActiveAccount } from 'api/stellar';
import BN from 'helpers/BN';
import StellarSDK from 'stellar-sdk';
import minimizeAddress from 'helpers/minimizeAddress';
import ConfirmSendAsset from './ConfirmSendAsset';
import styles from './styles.module.scss';

const SendAsset = ({ selectedAsset }) => {
  const {
    handleSubmit,
    formState,
    control,
    setValue,
    trigger,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const userBalance = useSelector((state) => state.userBalance);
  const foundBalance = userBalance.find((balance) => isSameAsset(balance.asset, selectedAsset));
  const userSubentry = useSelector((state) => state.user.detail.subentry);
  const userAddress = useSelector((state) => state.user.detail.address);

  const setMaxAmount = () => {
    if (getAssetDetails(selectedAsset).isNative()) {
      setValue('amount', calculateMaxXLM(foundBalance.balance, userSubentry), { shouldValidate: true });
    } else {
      setValue('amount', foundBalance.balance, { shouldValidate: true });
    }
  };

  function onSubmit(formData) {
    dispatch(
      openModalAction({
        modalProps: { title: 'Confirm sending' },
        content: <ConfirmSendAsset data={{ ...formData, selectedAsset }} />,
      }),
    );
  }

  useEffect(() => {
    trigger();
  }, []);

  function generateErrors() {
    for (const error of Object.values(formState.errors)) {
      if (error.message) {
        return error.message;
      }
    }

    return 'Send';
  }

  const validateAmount = async (value) => {
    if (new BN(value).lte(0)) {
      return 'Amount is not valid';
    }

    if (getAssetDetails(selectedAsset).isNative()
      && new BN(value).gt(calculateMaxXLM(foundBalance.balance, userSubentry))) {
      return 'Insufficient balance';
    }

    if (new BN(value).gt(foundBalance.balance)) {
      return 'Insufficient balance';
    }

    return true;
  };

  const validateDestination = async (value) => {
    if (!StellarSDK.StrKey.isValidEd25519PublicKey(value)) {
      return 'Destination is not valid';
    }

    if (value === userAddress) {
      return 'Destination cannot be your account';
    }

    try {
      const destinationAddressInfo = await isActiveAccount(value);
      if (getAssetDetails(selectedAsset).isNative()) {
        return true;
      }

      if (getAssetDetails(selectedAsset).getIssuer() === value) {
        return true;
      }

      let found;
      for (const asset of destinationAddressInfo.balances) {
        const isAssetMatchSelectedAsset = isSameAsset(
          getAssetDetails(selectedAsset),
          getAssetDetails({ code: asset.asset_code, issuer: asset.asset_issuer }),
        );
        if (isAssetMatchSelectedAsset) {
          found = asset;
          break;
        }
      }

      if (!found) {
        return `Destination account has no trustline to ${selectedAsset.code} asset`;
      }

      if (new BN(found.balance).plus(getValues().amount).gt(found.limit)) {
        return `Destination account cannot reciecve ${getValues().amount} ${selectedAsset.code}`;
      }
    } catch (e) {
      if (!getAssetDetails(selectedAsset).isNative()) {
        return 'Destination account is not active';
      }

      if (new BN(getValues().amount).lt(1)) {
        return 'Amount must be greater than 1';
      }
    }

    return true;
  };

  const validateMemo = (value) => {
    if (value?.length > 28) {
      return 'Memo is not valid';
    }
    return true;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="destination" className="label-primary mb-1">Asset</label>
        <div className={styles['input-asset']}>
          <img src={extractInfoByToken(selectedAsset).logo} width={26} height={26} alt="logo" />
          <span className={styles['asset-name']}>{selectedAsset.code}</span>
          <span className={styles['asset-web']}>{extractInfoByToken(selectedAsset).isWebIssuer ? minimizeAddress(extractInfoByToken(selectedAsset).web) : extractInfoByToken(selectedAsset).web}</span>
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
            validate: validateAmount,
          }}
          render={({ field }) => (
            <NumberOnlyInput
              onChange={field.onChange}
              value={field.value}
              placeholder="0.0"
              className={styles.numberInput}
              autoFocus
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
            validate: validateDestination,
          }}
          render={({ field }) => (
            <Input
              onChange={field.onChange}
              value={field.value}
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
            validate: validateMemo,
          }}
          render={({ field }) => (
            <Input
              onChange={field.onChange}
              value={field.value}
              className={styles.numberInput}
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
