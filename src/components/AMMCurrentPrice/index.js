import BN from 'helpers/BN';
import humanAmount from 'helpers/humanAmount';
import React from 'react';
import { getAssetFromLPAsset } from 'helpers/asset';
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
        {humanAmount(new BN(poolData.reserves[0].amount)
          .div(poolData.reserves[1].amount)
          .toFixed(7))}
        {' '}{getAssetFromLPAsset(poolData.reserves[0].asset).code} per 1 {getAssetFromLPAsset(poolData.reserves[1].asset).code}
      </div>
    </div>
  );
};

export default AMMCurrentPrice;
