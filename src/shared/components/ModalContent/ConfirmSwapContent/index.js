import React from 'react';
import classNames from 'classnames';
import arrowDown from 'src/assets/images/arrow-down.png';
import InfoItem from 'src/shared/components/InfoItem';
import hideModal from 'src/actions/modal/hide';
import sendTokenWithPrivateKey from 'src/api/sendTokenWithPrivateKey';
import styles from './styles.less';

const ConfirmSwapContent = (checkout) => {
  const confirmInfo = [
    {
      subject: 'Minimum received', value: `${(checkout.fromAmount * checkout.counterPrice * (1 - checkout.tolerance)).toFixed(3)} ${checkout.toAsset.code}`, tooltipId: 'rc-eth', tooltipInfo: 'This is a tooltip',
    },
    {
      subject: 'Set slippage tolerance', value: `${checkout.tolerance * 100}%`, tooltipId: 'tolerance', tooltipInfo: 'This is a tooltip',
    },
  ];

  return (
    <>
      <div className="row justify-content-between h-100 align-items-center" style={{ marginTop: '-12px' }}>
        <div className={classNames('col-auto', styles.value)}>{checkout.fromAmount.toFixed(3)}</div>
        <div className={classNames('col-auto', styles.crypto)}>
          <img src={checkout.fromAsset.logo} alt="logo" />{checkout.fromAsset.code}
          <span className={styles.web}>({checkout.fromAsset.web})</span>
        </div>
      </div>
      <img
        src={arrowDown}
        height="24px"
        width="24px"
        alt="arrow"
      />
      <div className="row justify-content-between h-100 align-items-center">
        <div className={classNames('col-auto', styles.value)}>{(checkout.fromAmount * checkout.counterPrice).toFixed(3)}</div>
        <div className={classNames('col-auto', styles.crypto)}>
          <img src={checkout.toAsset.logo} alt="logo" />{checkout.toAsset.code}
          <span className={styles.web}>({checkout.toAsset.web})</span>
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
          sendTokenWithPrivateKey();
        }}
      >Confirm
      </button>
    </>
  );
};

export default ConfirmSwapContent;
