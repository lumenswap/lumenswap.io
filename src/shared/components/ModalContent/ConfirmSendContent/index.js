import React from 'react';
import classNames from 'classnames';
import arrowDown from 'src/assets/images/arrow-down.png';
import InfoItem from 'src/shared/components/InfoItem';
import styles from './styles.module.scss';
import { minimumReceived, slippageTolerance } from 'src/constants/info';
import minimizeAddress from 'src/helpers/minimizeAddress';
import hideModal from 'src/actions/modal/hide';
import reportSwapConfirmClick from 'src/api/metrics/reportSwapConfirmClick';
import normalizeAmount from 'src/helpers/normalizeAmount';
import sendTokenMaker from 'src/api/sendTokenMaker';

const ConfirmSendContent = (checkout) => {
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
      <div className="row justify-content-between">
        <div className={classNames('col-auto', styles.subject)}>From</div>
        <div className={classNames('col-auto', styles.address)}>
          {minimizeAddress(checkout.fromAddress)}
        </div>
      </div>
      <div className="row justify-content-between mt-3">
        <div className={classNames('col-auto', styles.subject)}>To</div>
        <div className={classNames('col-auto', styles.address)}>
          {minimizeAddress(checkout.toAddress)}
        </div>
      </div>
      <hr className={styles.hr} />
      <div className="row justify-content-between mt-3 h-100 align-items-center">
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
      {!checkout.useSameCoin && (
        <div>
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
        </div>
      )}

      <button
        type="button"
        className="button-primary-lg "
        style={{ marginTop: '32px', marginBottom: '10px' }}
        onClick={() => {
          hideModal();
          reportSwapConfirmClick();
          sendTokenMaker();
        }}
      >
        Confirm
      </button>
    </>
  );
};

export default ConfirmSendContent;
