import classNames from 'classnames';
import logo from 'assets/images/btc-logo.png';
import styles from './styles.module.scss';
import Button from '../../components/Button';

const ConfirmSwap = () => (
  <div>
    <div className={styles['swap-container']}>
      <div className="d-flex align-items-center"><img src={logo} width={20} height={20} alt="logo" />0.01</div>
      <div>BTC</div>
    </div>
    <span className={classNames('icon-arrow-down', styles.arrow)} />
    <div className={styles['swap-container']}>
      <div className="d-flex align-items-center"><img src={logo} width={20} height={20} alt="logo" />18.234</div>
      <div>ETH</div>
    </div>
    <p className={styles.message}>
      output is estimated. you will receive at least 18.1883 ETH or the transaction will revert.
    </p>
    <div className={styles.info}>
      <div className={styles.container}>
        <div className={styles.label}>Price<span className="icon-question-circle" /></div>
        <div className={styles.value}>1 BTC = 12 ETH<span className="icon-arrow-repeat" /></div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Minimum received<span className="icon-question-circle" /></div>
        <div className={classNames(styles.value, styles.important)}>0.8%</div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Price impact<span className="icon-question-circle" /></div>
        <div className={styles.value}>0.00003 ETH</div>
      </div>
      <Button
        htmlType="submit"
        variant="primary"
        content="Confirm"
        fontSize={18}
        fontWeight="Medium"
        size="100%"
        className="mt-4"
      />
    </div>
  </div>
);

export default ConfirmSwap;
