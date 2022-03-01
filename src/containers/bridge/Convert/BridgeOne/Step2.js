import React, { useEffect } from 'react';
import classNames from 'classnames';

import Loading from 'components/Loading';

import styles from '../step.module.scss';

const Step2 = ({ nextStep }) => {
  useEffect(() => {
    setTimeout(() => {
      nextStep();
    }, 2000);
  }, []);

  return (
    <>
      <p className={styles.text}>
        PWe are sending 2 LBTC to your address. Please be patient.
      </p>

      <div className={classNames(styles.loading, styles['loading-one'])}>
        <Loading size={40} />
      </div>
    </>
  );
};

export default Step2;
