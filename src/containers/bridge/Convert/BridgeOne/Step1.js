import React from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import CopyIcon from 'assets/images/copy';
import QrIcon from 'assets/images/qr';
import copyText from 'helpers/copyText';
import styles from './styles.module.scss';

const Step1 = ({ nextStep }) => (
  <>
    <p className={styles.text}>
      Please send the specified amount to the specified address.
    </p>

    <label className="label-primary mt-4 mb-0">Amount</label>
    <div className={styles['copy-box']}>
      1100 USDT
      <span
        className={styles.icon}
        onClick={() => {
          copyText('1100 USDT');
        }}
      >
        <CopyIcon />
      </span>
    </div>

    <label className="label-primary mt-4 mb-0">Address</label>
    <div className={styles['copy-box']}>
      GCHE….2FK0
      <div className="d-flex">
        <span className={styles.icon}>
          <QrIcon />
        </span>

        <span
          className={classNames(styles.icon, 'ml-2')}
          onClick={() => {
            copyText('GCHE….2FK0');
          }}
        >
          <CopyIcon />
        </span>
      </div>
    </div>

    <div className={styles.note}>
      When the Ethereum network approval the transaction,
      you will automatically be redirected to the next step.
    </div>

    <Button
      variant="primary"
      content="Confirm"
      className="mt-4"
      size="100%"
      onClick={nextStep}
    />
  </>
);

export default Step1;
