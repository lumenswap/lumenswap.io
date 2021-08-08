import { Controller, useForm } from 'react-hook-form';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import generateManageBuyTRX from 'stellar-trx/generateManageBuyTRX';
import { initializeStore } from 'store';
import getAssetDetails from 'helpers/getAssetDetails';
import LSP from 'tokens/LSP';
import XLM from 'tokens/XLM';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import isSameAsset from 'helpers/isSameAsset';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

const SendBid = ({ setShow }) => {
  const {
    handleSubmit, control, watch, formState, trigger, getValues,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();

  useEffect(() => {
    trigger(['lsp', 'price']);
  }, [watch('lsp'), watch('price')]);

  async function onSubmit(data) {
    const store = initializeStore();
    const address = store.getState().user.detail.address;

    function func() {
      return generateManageBuyTRX(
        address,
        getAssetDetails(LSP),
        getAssetDetails(XLM),
        new BN(data.lsp).toFixed(7),
        new BN(data.price).toFixed(7),
        0,
      );
    }

    setShow(false);

    showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch))
      .catch(console.log);
  }

  const price = watch('price');
  const lsp = watch('lsp');
  let total = new BN(0);
  if (price !== '' && !!price && lsp !== '' && !!lsp) {
    total = new BN(price).times(lsp);
  }

  function buttonContent() {
    const errorMessage = formState.errors?.lsp?.message || formState.errors?.price?.message;
    if (errorMessage) {
      return errorMessage;
    }

    return 'Send';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-primary mb-1">Amount</label>
      <Controller
        name="lsp"
        control={control}
        rules={{
          required: 'LSP amount is required',
          validate: (val) => {
            if (!(new BN(val).isGreaterThan(0))) {
              return 'LSP amount must be greater than 0';
            }

            return true;
          },
        }}
        defaultValue=""
        render={(props) => (
          <InputGroup
            variant="primary"
            placeholder="100"
            rightLabel="LSP"
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
            const userXlm = store
              .getState()
              .userBalance
              .find((balance) => isSameAsset(getAssetDetails(balance.asset), getAssetDetails(XLM)));

            if (new BN(val).isLessThan(0.002)) {
              return 'Price must be greater than 0.002';
            }

            const lspVal = getValues().lsp;
            if (lspVal && new BN(val).times(lspVal).isGreaterThan(userXlm.balance)) {
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
