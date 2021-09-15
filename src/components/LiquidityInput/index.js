import Image from 'next/image';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const LiquidityInput = ({
  balance, currency, currencySrc, value, className,
}) => (
  <div className={classNames(styles.box, className)}>
    <div className={styles.amount}>
      <div>Amount</div>
      <div>Balance: {balance}</div>
    </div>
    <div className="row">
      <div className="col pr-0">
        <input
          className={styles.input}
          placeholder="0.0"
          type="text"
          value={value}
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

LiquidityInput.propTypes = {

};

export default LiquidityInput;
