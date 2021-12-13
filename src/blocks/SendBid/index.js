import { Controller, useForm } from 'react-hook-form';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import getAssetDetails from 'helpers/getAssetDetails';
import XLM from 'tokens/XLM';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import isSameAsset from 'helpers/isSameAsset';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmBid from 'blocks/ConfirmBid';
import { openModalAction } from 'actions/modal';
import styles from './styles.module.scss';

const SendBid = ({ tokenA }) => {
  const userBalance = useSelector((state) => state.userBalance);
  const {
    handleSubmit, control, watch, formState, trigger, getValues,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();

  useEffect(() => {
    trigger(['tokenAmount', 'price']);
  }, [watch('tokenAmount'), watch('price')]);

  async function onSubmit(data) {
    dispatch(
      openModalAction({
        modalProps: { title: 'Confirm Bid' },
        content: (
          <ConfirmBid data={data} tokenA={tokenA} />
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

  const userXlm = userBalance
    .find((balance) => isSameAsset(getAssetDetails(balance.asset), getAssetDetails(XLM)));

  function buttonContent() {
    const errorMessage = formState.errors?.tokenAmount?.message || formState.errors?.price?.message;
    if (errorMessage) {
      return errorMessage;
    }

    return 'Send';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-primary mb-1">Amount</label>
      <Controller
        name="tokenAmount"
        control={control}
        rules={{
          required: 'amount is required',
          validate: (val) => {
            if (!(new BN(val).isGreaterThan(0))) {
              return 'amount must be greater than 0';
            }

            return true;
          },
        }}
        defaultValue=""
        render={(props) => (
          <InputGroup
            variant="primary"
            placeholder="100"
            rightLabel={`${tokenA.code}`}
            value={props.value}
            onChange={props.onChange}
          />
        )}
      />
      <label className="label-primary mt-3 mb-1">Price</label>
      <Controller
        name="price"
        control={control}
        rules={{
          required: 'Price is required',
          validate: (val) => {
            if (new BN(val).isLessThan(0.002)) {
              return 'Price must be greater than 0.002';
            }

            const tokenAmountVal = getValues().tokenAmount;
            if (tokenAmountVal && new BN(val)
              .times(tokenAmountVal).isGreaterThan(userXlm.balance)) {
              return 'Insufficient XLM balance';
            }

            return true;
          },
        }}
        defaultValue=""
        render={(props) => (
          <InputGroup
            variant="primary"
            placeholder="0.002"
            rightLabel="XLM"
            value={props.value}
            onChange={props.onChange}
          />
        )}
      />
      <div className={styles.total}>
        <div>Total</div>
        <div>{sevenDigit(total.toFixed(7))} XLM</div>
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

export default SendBid;
