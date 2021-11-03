import React from 'react';
import Image from 'next/image';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import Button from 'components/Button';
import { extractLogo } from 'helpers/assetUtils';
import humanAmount from 'helpers/humanAmount';
import BN from 'helpers/BN';
import { initializeStore } from 'store';
import generateWithdrawPoolTRX from 'stellar-trx/generateWithdrawPoolTRX';
import getAssetDetails from 'helpers/getAssetDetails';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import styles from './styles.module.scss';

const WithdrawLiquidityConfirm = ({ data, afterWithdraw }) => {
  async function withdrawPool() {
    const store = initializeStore();
    const storeData = store.getState();

    const minAmountA = new BN(data.tokenA.balance).minus(data.tokenA.balance.times(data.tolerance));
    const minAmountB = new BN(data.tokenB.balance).minus(data.tokenB.balance.times(data.tolerance));

    function func() {
      return generateWithdrawPoolTRX(
        storeData.user.detail.address,
        getAssetDetails(data.tokenA),
        getAssetDetails(data.tokenB),
        data.userShare,
        minAmountA.toFixed(7),
        minAmountB.toFixed(7),
      );
    }

    await showGenerateTrx(func, store.dispatch)
      .then((trx) => showSignResponse(trx, store.dispatch))
      .catch(console.error);

    afterWithdraw();
  }

  return (
    <div className="pb-4">
      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={extractLogo(data.tokenA)} width={20} height={20} /></div>
          <div>{data.tokenA.code}</div>
        </div>
        <div>{humanAmount(data.tokenA.balance)}</div>
      </div>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={extractLogo(data.tokenB)} width={20} height={20} /></div>
          <div>{data.tokenB.code}</div>
        </div>
        <div>{humanAmount(data.tokenB.balance)}</div>
      </div>

      <div className={styles.current}><AMMCurrentPrice poolData={data.poolData} /></div>

      <Button
        variant="primary"
        content="Confirm"
        fontWeight={500}
        className={styles.btn}
        onClick={withdrawPool}
      />
    </div>
  );
};

export default WithdrawLiquidityConfirm;
