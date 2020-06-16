import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { trsStatus } from 'Root/constants/enum';
import failLogo from 'Root/assets/images/exclamation-circle.png';
import successLogo from 'Root/assets/images/tick-circle.png';
import angleRight from 'Root/assets/images/angle-right-light.svg';
import styles from './styles.less';

const TransactionStatusContent = ({ status, address, toggle }) => {
  const isSuccess = (status === trsStatus.SUCCESS);
  return (
    <div className="text-center" style={{ marginTop: '-35px' }}>
      <img src={isSuccess ? successLogo : failLogo} className={styles.img} alt="logo" />
      <h1 className={styles.title}>{isSuccess ? 'Success transaction' : 'Failed'}</h1>
      <p className={styles.text}>
        {isSuccess ? address : 'There is some issue in your transaction'}
      </p>
      {isSuccess
        ? (
          <Link to="/" className={styles.btn}>
        View on explorer
            <img
              src={angleRight}
              width="11px"
              height="11px"
              alt="icon"
              className="ml-1"
            />
          </Link>
        ) : (
          <button
            type="button"
            className={classNames(styles.btn, 'mt-5')}
            onClick={() => toggle(false)}
          >
            Got it
          </button>
        )}
    </div>
  );
};

TransactionStatusContent.propTypes = {

};

export default TransactionStatusContent;
