import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import btcLogo from 'src/assets/images/btc-logo.png';
import ethLogo from 'src/assets/images/eth-logo.png';
import arrowDown from 'src/assets/images/arrow-down.png';
import InfoItem from 'src/shared/components/InfoItem';
import styles from './styles.module.scss';

const ConfirmSendContent = (props) => {
  const confirmInfo = [
    {
      subject: 'Minimum received', value: '2952 ETH', tooltipId: 'rc-eth', tooltipInfo: 'This is a tooltip',
    },
    {
      subject: 'Price spread', value: '2%', tooltipId: 'price-spread', tooltipInfo: 'This is a tooltip',
    },
    {
      subject: 'Set slippage tolerance', value: '0.1%', tooltipId: 'tolerance', tooltipInfo: 'This is a tooltip',
    },
  ];
  return (
    <>
      <div className="row justify-content-between">
        <div className={classNames('col-auto', styles.subject)}>From</div>
        <div className={classNames('col-auto', styles.address)}>G123…8942</div>
      </div>
      <div className="row justify-content-between mt-3">
        <div className={classNames('col-auto', styles.subject)}>To</div>
        <div className={classNames('col-auto', styles.address)}>Gj54…k453</div>
      </div>
      <hr className={styles.hr} />
      <div className="row justify-content-between mt-3 h-100 align-items-center">
        <div className={classNames('col-auto', styles.value)}>5</div>
        <div className={classNames('col-auto', styles.crypto)}>
          <img src={btcLogo} alt="logo" />BTC
          <span className={styles.web}>(amir.com)</span>
        </div>
      </div>
      <img
        src={arrowDown}
        height="24px"
        width="24px"
        alt="arrow"
      />
      <div className="row justify-content-between h-100 align-items-center">
        <div className={classNames('col-auto', styles.value)}>11.5</div>
        <div className={classNames('col-auto', styles.crypto)}>
          <img src={ethLogo} alt="logo" />ETH
          <span className={styles.web}>(apay.com)</span>
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
      >Confirm
      </button>
    </>
  );
};

ConfirmSendContent.propTypes = {

};

export default ConfirmSendContent;
