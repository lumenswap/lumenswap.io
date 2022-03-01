import React, { useEffect } from 'react';
import Loading from 'components/Loading';
import styles from './styles.module.scss';

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

      <div className={styles.loading}>
        <Loading size={40} />
      </div>
    </>
  );
};

export default Step2;
