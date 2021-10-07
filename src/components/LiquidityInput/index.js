import Image from 'next/image';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BN from 'bn.js';
import NumberOnlyInput from 'components/NumberOnlyInput';
import styles from './styles.module.scss';

const LiquidityInput = ({
  balance, currency, currencySrc, value, className, onChange,
}) => (
  <div className={classNames(styles.box, className)}>
    <div className={styles.amount}>
      <div>Amount</div>
      <div>Balance: {balance}</div>
    </div>
    <div className="row">
      <div className="col pr-0">
        <NumberOnlyInput
          onChange={onChange}
          value={value}
          className={styles.input}
          placeholder="0.0"
        />
      </div>
      <div className="col-auto pl-0">
        <div className={styles.badge}>
          <Image src={currencySrc} width={20} height={20} alt={currency} />
          <span className="ml-2">{currency}</span>
        </div>
      </div>
    </div>
  </div>
);

LiquidityInput.defaultProps = {
  className: '',
};

LiquidityInput.propTypes = {
  balance: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencySrc: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default LiquidityInput;
