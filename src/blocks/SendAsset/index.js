import { useForm } from 'react-hook-form';
import Input from 'components/Input';
import Button from 'components/Button';
import logoSrc from 'assets/images/btc-logo.png';

import styles from './styles.module.scss';

const SendAsset = (props) => {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    mode: 'onChange',
  });

  function onSubmit(data) { console.warn(data); }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="destination" className="label-primary mb-1">Asset</label>
        <div className={styles['input-asset']}>
          <img src={logoSrc} width={26} height={26} alt="logo" />
          <span className={styles['asset-name']}>ETH</span>
          <span className={styles['asset-web']}>Ethereum.com</span>
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="amount" className="label-primary d-flex justify-content-between mb-1">
          Amount
          <span className={styles.max}>Max</span>
        </label>
        <Input
          type="number"
          placeholder="1"
          name="amount"
          id="amount"
          height={48}
          fontSize={20}
          autoFocus
          innerRef={register}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="destination" className="label-primary mb-1">Destination</label>
        <Input
          type="text"
          placeholder="G ..."
          name="destination"
          id="destination"
          height={48}
          fontSize={20}
          innerRef={register}
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="memo" className="label-primary mb-1">Memo <span className="label-optional">(optional)</span></label>
        <Input
          type="number"
          name="memo"
          id="memo"
          height={48}
          fontSize={20}
          autoFocus
          innerRef={register}
        />
      </div>
      <Button
        htmlType="submit"
        variant="primary"
        content="Send"
        className={styles.btn}
        disabled={!formState.isValid || formState.isValidating}
      />
    </form>
  );
};

export default SendAsset;
