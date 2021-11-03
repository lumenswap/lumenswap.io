import React from 'react';
import Image from 'next/image';
import generateDepositPoolTRX from 'stellar-trx/generateDepositPoolTRX';
import AMMCurrentPrice from 'components/AMMCurrentPrice';
import Button from 'components/Button';
import getAssetDetails from 'helpers/getAssetDetails';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import { initializeStore } from 'store';
import { extractLogo } from 'helpers/assetUtils';
import ShowTolerance from 'containers/amm/ShowTolerance';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

const ConfirmLiquidity = ({ data, afterDeposit = () => {} }) => {
  async function confirm() {
    const store = initializeStore();
    const storeData = store.getState();

    let currentPrice = new BN(data.poolData.reserves[0].amount)
      .div(data.poolData.reserves[1].amount);

    if (new BN(data.poolData.reserves[0].amount).eq(0)) {
      currentPrice = new BN(data.tokenA.amount).div(data.tokenB.amount);
    }

    const max = currentPrice.plus(currentPrice.times(data.tolerance));
    const min = currentPrice.minus(currentPrice.times(data.tolerance));

    function func() {
      return generateDepositPoolTRX(
        storeData.user.detail.address,
        getAssetDetails(data.tokenA),
        getAssetDetails(data.tokenB),
        data.tokenA.amount,
        data.tokenB.amount,
        max.toFixed(7),
        min.toFixed(7),
      );
    }

    await showGenerateTrx(func, store.dispatch)
      .then((trx) => showSignResponse(trx, store.dispatch))
      .catch(console.error);

    afterDeposit();
  }

  return (
    <div className="pb-4">
      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={extractLogo(data.tokenA)} width={20} height={20} /></div>
          <div>{data.tokenA.code}</div>
        </div>
        <div>{data.tokenA.amount}</div>
      </div>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><Image src={extractLogo(data.tokenB)} width={20} height={20} /></div>
          <div>{data.tokenB.code}</div>
        </div>
        <div>{data.tokenB.amount}</div>
      </div>

      <div className={styles.current}>
        <AMMCurrentPrice poolData={data.poolData} />
      </div>
      <ShowTolerance value={data.tolerance} />

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
