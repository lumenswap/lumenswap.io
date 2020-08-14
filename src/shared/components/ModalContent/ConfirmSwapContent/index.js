import React from 'react';
import classNames from 'classnames';
import arrowDown from 'src/assets/images/arrow-down.png';
import InfoItem from 'src/shared/components/InfoItem';
import hideModal from 'src/actions/modal/hide';
import { minimumReceived, slippageTolerance } from 'src/constants/info';
import reportSwapConfirmClick from 'src/api/metrics/reportSwapConfirmClick';
import styles from './styles.module.scss';
import normalizeAmount from 'src/helpers/normalizeAmount';
import minimizeAddress from 'src/helpers/minimizeAddress';
import { swapTokenMaker } from 'src/api/swapTokenMaker';

const ConfirmSwapContent = (checkout) => {
  const confirmInfo = [
    {
      subject: 'Minimum received',
      value: `${normalizeAmount(
        checkout.fromAmount * checkout.counterPrice * (1 - checkout.tolerance)
      )} ${checkout.toAsset.code}`,
      tooltipId: 'rc-eth',
      tooltipInfo: minimumReceived,
    },
    {
      subject: 'Set slippage tolerance',
      value: `${checkout.tolerance * 100}%`,
      tooltipId: 'tolerance',
      tooltipInfo: slippageTolerance,
    },
  ];

  return (
    <>
      <div
        className="row justify-content-between h-100 align-items-center"
        style={{ marginTop: '-12px' }}
      >
        <div className={classNames('col-auto', styles.value)}>
          {normalizeAmount(checkout.fromAmount)}
        </div>
        <div className={classNames('col-auto', styles.crypto)}>
          <img src={checkout.fromAsset.logo} alt="logo" />
          {checkout.fromAsset.code}
          <span className={styles.web}>
            ({minimizeAddress(checkout.fromAsset.web)})
          </span>
        </div>
      </div>
      <img src={arrowDown} height="24px" width="24px" alt="arrow" />
      <div className="row justify-content-between h-100 align-items-center">
        <div className={classNames('col-auto', styles.value)}>
          {normalizeAmount(checkout.fromAmount * checkout.counterPrice)}
        </div>
        <div className={classNames('col-auto', styles.crypto)}>
          <img src={checkout.toAsset.logo} alt="logo" />
          {checkout.toAsset.code}
          <span className={styles.web}>
            ({minimizeAddress(checkout.toAsset.web)})
          </span>
        </div>
      </div>
      <div className={styles.box}>
        {confirmInfo.map((item, index) => (
          <div key={index}>
            <InfoItem item={item} />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="button-primary-lg "
        style={{ marginTop: '32px', marginBottom: '10px' }}
        onClick={() => {
          hideModal();
          reportSwapConfirmClick();
          swapTokenMaker();
        }}
      >
        Confirm
      </button>
    </>
  );
};

export default ConfirmSwapContent;
