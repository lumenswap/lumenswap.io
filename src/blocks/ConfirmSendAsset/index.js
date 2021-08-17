import { useDispatch } from 'react-redux';

import logoSrc from 'assets/images/btc-logo.png';
import Button from 'components/Button';

import { closeModalAction } from 'actions/modal';

import styles from './styles.module.scss';

const ConfirmSendAsset = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <label className={styles.label}>Asset</label>
      <div className="d-flex align-items-center mt-1">
        <img src={logoSrc} width={26} height={26} alt="logo" />
        <span className={styles['asset-name']}>ETH</span>
        <span className={styles['asset-web']}>Ethereum.com</span>
      </div>
      <hr className={styles.hr} />
      <label className={styles.label}>Amount</label>
      <div className={styles.value}>4.5</div>
      <hr className={styles.hr} />
      <label className={styles.label}>Destination</label>
      <div className={styles.value}>Gf8e9a3f…de5fb663</div>
      <hr className={styles.hr} />
      <label className={styles.label}>Memo</label>
      <div className={styles.value}>3.5</div>
      <Button
        variant="primary"
        content="Confirm"
        className={styles.btn}
        onClick={() => {
          dispatch(closeModalAction());
        }}
      />
    </div>
  );
};

export default ConfirmSendAsset;
