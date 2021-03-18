import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CurrencyInput = ({
  label, currentCurrency, balance, max,
}) => (
  <div className={styles.card}>
    <div className="d-flex justify-content-between">
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.label}>
        Balance:
        {' '}
        {balance}
      </div>
    </div>
    <div className={classNames('input-group', styles['input-group'])}>
      <input type="number" className={styles.input} placeholder="0.0" />
      <div className="d-flex align-items-center">
        {max && <button type="button" className={styles.max}>Max</button>}
        <button type="button" className={styles['drop-down']}>
          <img src={currentCurrency.img} alt="logo" />
          {currentCurrency.name}
        </button>
      </div>
    </div>
  </div>
);

CurrencyInput.defaultProps = {
  max: false,
};

CurrencyInput.propTypes = {
  label: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  currentCurrency: PropTypes.object.isRequired,
  max: PropTypes.bool,
};

export default CurrencyInput;
