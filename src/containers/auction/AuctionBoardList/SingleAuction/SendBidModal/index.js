import { Controller, useForm } from 'react-hook-form';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import { calculateMaxXLM, getAssetDetails, getSingleToken } from 'helpers/asset';
import BN from 'helpers/BN';
import humanizeAmount from 'helpers/humanizeAmount';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from 'actions/modal';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import useDefaultTokens from 'hooks/useDefaultTokens';
import ConfirmBidModal from './ConfirmBidModal';
import styles from './styles.module.scss';

const SendBidModal = ({ baseToken, basePrice, reloadData }) => {
  const subEntry = useSelector((state) => state.user.detail.subentry);

  const {
    handleSubmit, control, watch, formState, trigger, getValues,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const defaultTokens = useDefaultTokens();

  useEffect(() => {
    trigger(['tokenAmount', 'price']);
  }, [watch('tokenAmount'), watch('price')]);

  async function onSubmit(formData) {
    dispatch(
      openModalAction({
        modalProps: { title: 'Confirm Bid' },
        content: (
          <ConfirmBidModal data={formData} baseToken={baseToken} reloadData={reloadData} />
        ),
      }),
    );
  }

  const price = watch('price');
  const token = watch('tokenAmount');
  let total = new BN(0);
  if (price !== '' && !!price && token !== '' && !!token) {
    total = new BN(price).times(token);
  }

  const userXlm = useUserSingleAsset(getAssetDetails(getSingleToken('XLM', defaultTokens)));

  function buttonContent() {
    for (const error of Object.values(formState.errors)) {
      if (error && error.message) {
        return error.message;
      }
    }

    return 'Send';
  }

  function validateTokenAmount(val) {
    if (!(new BN(val).isGreaterThan(0))) {
      return 'Amount must be greater than 0';
    }

    return true;
  }

  function validatePrice(val) {
    if (new BN(val).isLessThan(basePrice)) {
      return `Price must be greater than ${basePrice}`;
    }

    const tokenAmountVal = getValues().tokenAmount;
    if (tokenAmountVal && new BN(val)
      .times(tokenAmountVal).isGreaterThan(calculateMaxXLM(userXlm.balance, subEntry))) {
      return 'Insufficient XLM balance';
    }

    return true;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-primary mb-1">Amount</label>
      <Controller
        name="tokenAmount"
        control={control}
        rules={{
          required: 'Amount is required',
          validate: validateTokenAmount,
        }}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            variant="primary"
            placeholder="100"
            rightLabel={`${baseToken.code}`}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <label className="label-primary mt-3 mb-1">Price</label>
      <Controller
        name="price"
        control={control}
        rules={{
          required: 'Price is required',
          validate: validatePrice,
        }}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            variant="primary"
            placeholder={basePrice}
            rightLabel="XLM"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <div className={styles.total}>
        <div>Total</div>
        <div>{humanizeAmount(total.toFixed(7))} XLM</div>
      </div>
      <Button
        htmlType="submit"
        variant="primary"
        content={buttonContent()}
        className={styles.btn}
        disabled={!formState.isValid}
      />
    </form>
  );
};

export default SendBidModal;
