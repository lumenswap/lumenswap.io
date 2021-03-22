import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ModalDialog from 'components/ModalDialog';
import SelectAsset from './SelectAsset';
import styles from './styles.module.scss';

const CurrencyInput = ({
  label, currentCurrency, balance, children,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.card}>
      <div className="d-flex justify-content-between">
        <div className={styles.label}>
          {label}
        </div>
        <div className={styles.balance}>
          Balance:
          {' '}
          {balance}
        </div>
      </div>
      <div className={classNames('input-group', styles['input-group'])}>
        {children}
        <button type="button" className={styles['drop-down']} onClick={() => setShow(true)}>
          <img src={currentCurrency.img} alt="logo" />
          {currentCurrency.name}
          <span className="icon-angle-down" />
        </button>
        <ModalDialog show={show} setShow={setShow} title="Select an assets">
          <SelectAsset />
        </ModalDialog>
      </div>
    </div>
  );
};

CurrencyInput.propTypes = {
  label: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  currentCurrency: PropTypes.object.isRequired,
};

export default CurrencyInput;
