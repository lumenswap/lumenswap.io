import React from 'react';
import Input from 'components/Input';
import sampleLogo from 'assets/images/btc-logo.png';

import styles from './styles.module.scss';

const SelectAsset = () => (
  <>
    <Input
      type="text"
      placeholder="Search asset"
      className={styles.input}
    />
    <ul className={styles.list}>
      {Array(8).fill(
        <li>
          <img
            src={sampleLogo}
            width={24}
            height={24}
            alt="sample"
          />
          <div>BTC</div>
        </li>,
      )}
    </ul>
  </>
);

export default SelectAsset;
