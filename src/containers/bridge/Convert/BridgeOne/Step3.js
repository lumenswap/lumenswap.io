import React from 'react';
import TickIcon from 'assets/images/tick';
import AngleRightIcon from 'assets/images/angleRight';
import Button from 'components/Button';

import styles from './styles.module.scss';

const Step3 = () => (
  <div className="pt-1 text-center">
    <TickIcon />

    <h6 className={styles['status-title']}>Successful</h6>
    <p className={styles['status-desc']}>
      Your BTC conversion operation from
      <br />
      <span className="mx-1">Bitcoin</span>
      ${'->'}
      <span className="mx-1">Stellar</span>
      was successful.
    </p>
    <Button variant="primary" className={styles['detail-btn']}>
      More details
      <span className="ml-2">
        <AngleRightIcon />
      </span>
    </Button>
  </div>
);

export default Step3;
