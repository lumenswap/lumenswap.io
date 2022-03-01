import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from 'components/Button';
import Loading from 'components/Loading';

import styles from '../step.module.scss';

const Step1 = ({ nextStep }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        nextStep();
      }, 2000);
    }
  }, [loading]);

  return (
    <>
      {loading
        ? (
          <>
            <p className={styles.text}>
              Please wait for the transaction to be confirmed by Stellar Network
            </p>

            <div className={classNames(styles.loading, styles['loading-two'])}>
              <Loading size={40} />
            </div>
          </>
        ) : (
          <>
            <p className={styles.text}>
              You must sign here to approve the withdrawal of 2 ‌LBTC from your wallet.
            </p>

            <Button
              variant="primary"
              content="Sign"
              size="100%"
              className="mt-5"
              onClick={() => setLoading(true)}
            />
          </>
        )}
    </>
  );
};

export default Step1;
