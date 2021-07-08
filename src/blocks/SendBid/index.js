import { Controller, useForm } from 'react-hook-form';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';

import styles from './styles.module.scss';

const SendBid = () => {
  const { handleSubmit, control } = useForm();

  async function onSubmit(data) {
    console.warn(data);
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
          <InputGroup variant="primary" placeholder="100" rightLabel="LSP" value={props.value} onChange={props.onChange} />
        )}
      />
      <label className="label-primary mt-3 mb-1">Price</label>
      <Controller
        name="price"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={(props) => (
          <InputGroup variant="primary" placeholder="0.01" rightLabel="XLM" value={props.value} onChange={props.onChange} />
        )}
      />
      <div className={styles.total}>
        <div>Total</div>
        <div>1,500 XLM</div>
      </div>
      <Button variant="primary" content="Send" className={styles.btn} />
    </form>
  );
};

export default SendBid;
