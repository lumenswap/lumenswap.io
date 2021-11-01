import BN from 'helpers/BN';
import React from 'react';
import styles from './styles.module.scss';

const AMMCurrentPrice = ({ poolData }) => {
  if (!poolData) {
    return (
      <div className={styles.box}>
        <div className={styles['box-title']}>Current Price</div>
        <div className={styles['box-value']}>
          Loading...
        </div>
      </div>
    );
  }

  if (new BN(poolData.reserves[0].amount).eq(0)) {
    return (
      <div className={styles.box}>
        <div className={styles['box-title']}>Current Price</div>
        <div className={styles['box-value']}>
          Price is not set yet!
        </div>
      </div>
    );
  }

  return (
    <div className={styles.box}>
      <div className={styles['box-title']}>Current Price</div>
      <div className={styles['box-value']}>
        {new BN(poolData.reserves[0].amount).div(poolData.reserves[1].amount)} {poolData.reserves[0].asset.split(':')[0]} per 1 {poolData.reserves[1].asset.split(':')[1]}
      </div>
    </div>
  );
};

export default AMMCurrentPrice;
