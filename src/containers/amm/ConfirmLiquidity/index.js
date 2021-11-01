import React from 'react';
import Image from 'next/image';
import generateDepositPoolTRX from 'stellar-trx/generateDepositPoolTRX';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import Button from 'components/Button';
import getAssetDetails from 'helpers/getAssetDetails';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import { initializeStore } from 'store';
import styles from './styles.module.scss';

const ConfirmLiquidity = ({ data }) => {
  function confirm() {
    const store = initializeStore();
    const storeData = store.getState();

    console.log(data);

    function func() {
      return generateDepositPoolTRX(
        storeData.user.detail.address,
        getAssetDetails(data.tokenA),
        getAssetDetails(data.tokenB),
        data.tokenA.amount,
        data.tokenB.amount,
        data.range.max,
        data.range.min,
      );
    }

    showGenerateTrx(func, store.dispatch)
      .then((trx) => showSignResponse(trx, store.dispatch))
      .catch(console.error);
  }

  return (
    <div className="pb-4">
      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={data.tokenA.logo} width={20} height={20} /></div>
          <div>{data.tokenA.code}</div>
        </div>
        <div>{data.tokenA.amount}</div>
      </div>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={data.tokenB.logo} width={20} height={20} /></div>
          <div>{data.tokenB.code}</div>
        </div>
        <div>{data.tokenB.amount}</div>
      </div>

      <div className={styles.current}>
        <AMMCurrentPrice poolData={data.poolData} />
      </div>

      <Button
        variant="primary"
        content="Confirm"
        fontWeight={500}
        className={styles.btn}
        onClick={confirm}
      />
    </div>
  );
};

export default ConfirmLiquidity;
