import React, { useEffect } from 'react';
import classNames from 'classnames';
import ExternalIcon from 'assets/images/external';

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
        We send the transaction. Please wait for confirmation from Ethereum.
      </p>

      <div className={classNames(styles.note, styles['note-link'])}>
        Tx hash
        <br />
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="color-primary"
        >
          0x401b914336b87673822c1792786bf0ccf1793795c594c42f174078ff425697f8
          <ExternalIcon />
        </a>
      </div>
    </>
  );
};

export default Step2;
