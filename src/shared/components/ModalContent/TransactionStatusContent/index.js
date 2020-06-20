import React from 'react';
import classNames from 'classnames';
import { trsStatus } from 'src/constants/enum';
import failLogo from 'src/assets/images/exclamation-circle.png';
import successLogo from 'src/assets/images/tick-circle.png';
import angleRight from 'src/assets/images/angle-right-light.svg';
import hideModal from 'src/actions/modal/hide';
import styles from './styles.less';

const TransactionStatusContent = ({ status, message, link }) => {
  const isSuccess = (status === trsStatus.SUCCESS);
  return (
    <div className="text-center" style={{ marginTop: '-35px' }}>
      <img src={isSuccess ? successLogo : failLogo} className={styles.img} alt="logo" />
      <h1 className={styles.title}>{isSuccess ? 'Success transaction' : 'Failed'}</h1>
      <p className={styles.text}>
        {message}
      </p>
      {isSuccess
        ? (
          <button
            className={styles.btn}
            onClick={() => {
              hideModal();
              global.window.open(link, '_blank').focus();
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
        ) : (
          <button
            type="button"
            className={classNames(styles.btn, 'mt-5')}
            onClick={() => {
              hideModal();
            }}
          >
            Got it
          </button>
        )}
    </div>
  );
};

export default TransactionStatusContent;
