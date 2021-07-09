import { Controller, useForm } from 'react-hook-form';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import generateManageBuyTRX from 'stellar-trx/generateManageBuyTRX';
import store from 'store';
import getAssetDetails from 'helpers/getAssetDetails';
import LSP from 'tokens/LSP';
import XLM from 'tokens/XLM';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import styles from './styles.module.scss';

const SendBid = ({ setShow }) => {
  const {
    handleSubmit, control, watch,
  } = useForm();

  async function onSubmit(data) {
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

    showGenerateTrx(func)
      .then(showSignResponse)
      .catch(console.log);
  }

  const price = watch('price');
  const lsp = watch('lsp');
  let total = new BN(0);
  if (price !== '' && !!price && lsp !== '' && !!lsp) {
    total = new BN(price).times(lsp);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-primary mb-1">Amount</label>
      <Controller
        name="lsp"
        control={control}
        rules={{ required: true }}
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
        rules={{ required: true }}
        defaultValue=""
        render={(props) => (
          <InputGroup
            variant="primary"
            placeholder="0.01"
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
        content="Send"
        className={styles.btn}
      />
    </form>
  );
};

export default SendBid;
