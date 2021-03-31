import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ModalDialog from 'components/ModalDialog';
import SelectAsset from 'blocks/SelectAsset';
import { useSelector } from 'react-redux';
import isSameAsset from 'helpers/isSameAsset';
import sevenDigit from 'helpers/sevenDigit';
import styles from './styles.module.scss';

const CurrencyInput = ({
  label,
  currentCurrency,
  children,
  setCurrency,
  getFormValues,
  swapFromWithTo,
}) => {
  const [show, setShow] = useState(false);
  const userBalance = useSelector((state) => state.userBalance);
  const foundBalance = userBalance.find((item) => isSameAsset(currentCurrency.details, item.asset));

  return (
    <div className={styles.card}>
      <div className="d-flex justify-content-between">
        <div className={styles.label}>
          {label}
        </div>
        <div className={styles.balance}>
          Balance:
          {' '}
          {foundBalance ? sevenDigit(foundBalance.balance) : '0'}
        </div>
      </div>
      <div className={classNames('input-group', styles['input-group'])}>
        {children}
        <button type="button" className={styles['drop-down']} onClick={() => setShow(true)}>
          <img src={currentCurrency?.logo} alt="logo" />
          {currentCurrency?.details?.getCode()}
          <span className="icon-angle-down" />
        </button>
        <ModalDialog show={show} setShow={setShow} title="Select an assets">
          <SelectAsset
            getFormValues={getFormValues}
            swapFromWithTo={swapFromWithTo}
            setShow={setShow}
            setCurrency={setCurrency}
          />
        </ModalDialog>
      </div>
    </div>
  );
};

CurrencyInput.propTypes = {
  label: PropTypes.string.isRequired,
  currentCurrency: PropTypes.object.isRequired,
};

export default CurrencyInput;
