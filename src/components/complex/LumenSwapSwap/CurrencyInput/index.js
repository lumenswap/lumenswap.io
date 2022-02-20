import angleDownIcon from 'assets/images/angle-down.svg';
import { useState } from 'react';
import classNames from 'classnames';
import ModalDialog from 'components/ModalDialog';
import SelectAsset from 'components/complex/LumenSwapSwap/CurrencyInput/SelectAsset';
import { useSelector } from 'react-redux';
import { isSameAsset } from 'helpers/asset';
import humanizeAmount from 'helpers/humanizeAmount';
import styles from './styles.module.scss';

const CurrencyInput = ({
  label,
  currentCurrency,
  children,
  setCurrency,
  getFormValues,
  swapFromWithTo,
  changeToAsset,
}) => {
  const [show, setShow] = useState(false);
  const userBalance = useSelector((state) => state.userBalance);
  let foundBalance = null;
  if (currentCurrency) {
    foundBalance = userBalance.find((item) => isSameAsset(currentCurrency.details, item.asset));
  }
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <div className={styles.card}>
      <div className="d-flex justify-content-between">
        <div className={styles.label}>{label}</div>
        <div className={styles.balance}>
          {(isLogged && currentCurrency)
            ? `Balance: ${
              foundBalance ? humanizeAmount(foundBalance.balance) : '0'
            }`
            : null}
        </div>
      </div>
      <div className={classNames('input-group', styles['input-group'])}>
        {children}
        <button
          type="button"
          className={
            currentCurrency === null
              ? styles['no-asset-drop-down']
              : styles['drop-down']
          }
          onClick={() => setShow(true)}
        >
          {currentCurrency === null ? (
            <span>
              Select an asset
              <img src={angleDownIcon.src} />
            </span>
          ) : (
            <>
              <img src={currentCurrency?.logo} alt="logo" />
              {currentCurrency?.details?.getCode()}
              <span className="icon-angle-down" />
            </>
          )}
        </button>
        <ModalDialog show={show} setShow={setShow} title="Select an assets">
          <SelectAsset
            getFormValues={getFormValues}
            swapFromWithTo={swapFromWithTo}
            setShow={setShow}
            setCurrency={setCurrency}
            changeToAsset={changeToAsset}
            currentFrom={getFormValues()?.from?.asset}
            currentTo={getFormValues()?.to?.asset}
          />
        </ModalDialog>
      </div>
    </div>
  );
};

export default CurrencyInput;
