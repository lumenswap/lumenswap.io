import React from 'react';
import classNames from 'classnames';
import { trsStatus } from 'src/constants/enum';
import failLogo from 'src/assets/images/exclamation-circle.png';
import successLogo from 'src/assets/images/tick-circle.png';
import angleRight from 'src/assets/images/angle-right-light.svg';
import hideModal from 'src/actions/modal/hide';
import alertLogo from 'src/assets/images/alert.png';
import styles from './styles.module.scss';

function generateTitle(status) {
  if (status === trsStatus.FAIL) {
    return 'Failed';
  }

  if (status === trsStatus.SUCCESS) {
    return 'Success transaction';
  }

  return 'Large Order';
}

function generateButton(status, action = () => {}) {
  if (status === trsStatus.FAIL) {
    return (
      <button
        type="button"
        className={classNames(styles.btn, 'mt-5')}
        onClick={() => {
          hideModal();
          action();
        }}
      >
        Got it
      </button>
    );
  }

  if (status === trsStatus.SUCCESS) {
    return (
      <button
        className={styles.btn}
        onClick={() => {
          hideModal();
          action();
        }}
      >
        View on explorer
        <img
          src={angleRight}
          width="11px"
          height="11px"
          alt="icon"
          className="ml-1"
        />
      </button>
    );
  }

  return (
    <button
      className={styles.btn}
      onClick={() => {
        hideModal();
        action();
      }}
    >
      Confirm
    </button>
  );
}

function generateLogo(status) {
  if (status === trsStatus.FAIL) {
    return failLogo;
  }

  if (status === trsStatus.SUCCESS) {
    return successLogo;
  }

  return alertLogo;
}

const TransactionStatusContent = ({
  status, message, action,
}) => (
  <div className="text-center" style={{ marginTop: '-35px' }}>
    <img src={generateLogo(status)} className={styles.img} alt="logo" />
    <h1 className={styles.title}>{generateTitle(status)}</h1>
    <p className={styles.text}>
      {message}
    </p>
    {generateButton(status, action)}
  </div>
);

export default TransactionStatusContent;
