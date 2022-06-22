import React from 'react';
import generateDepositPoolTRX from 'stellar-trx/generateDepositPoolTRX';
import AMMCurrentPrice from 'containers/amm/mypool/AMMCurrentPrice';
import Button from 'components/Button';
import { getAssetDetails, extractLogoByToken } from 'helpers/asset';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import { initializeStore } from 'store';

// import ShowTolerance from 'containers/amm/ShowTolerance';
import BN from 'helpers/BN';
import useDefaultTokens from 'hooks/useDefaultTokens';
import styles from './styles.module.scss';

const ConfirmLiquidity = ({ data, afterDeposit = () => {} }) => {
  const defaultTokens = useDefaultTokens();
  async function confirm() {
    const store = initializeStore();
    const storeData = store.getState();

    let currentPrice = new BN(data.poolData.reserves[0].amount)
      .div(data.poolData.reserves[1].amount);

    if (new BN(data.poolData.reserves[0].amount).eq(0)) {
      currentPrice = new BN(data.tokenA.amount).div(data.tokenB.amount);
    }

    let max = currentPrice.plus(currentPrice.times(data.tolerance));
    let min = currentPrice.minus(currentPrice.times(data.tolerance));
    if (max.toFixed(7) === min.toFixed(7)) {
      max = max.plus(0.0000001);
      min = min.minus(0.0000001);
    }

    if (max.minus(min).isLessThanOrEqualTo(0.0000001)) {
      max = max.plus(0.0000001);
      min = min.minus(0.0000001);
    }

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
          <div className={styles['pair-img']}><img src={extractLogoByToken(data.tokenA, defaultTokens)} width={20} height={20} /></div>
          <div>{data.tokenA.code}</div>
        </div>
        <div>{data.tokenA.amount}</div>
      </div>

      <div className={styles.inpool}>
        <div className={styles.pair}>
          <div className={styles['pair-img']}><img src={extractLogoByToken(data.tokenB, defaultTokens)} width={20} height={20} /></div>
          <div>{data.tokenB.code}</div>
        </div>
        <div>{data.tokenB.amount}</div>
      </div>

      <div className={styles.current}>
        <AMMCurrentPrice poolData={data.poolData} />
      </div>
      {/* <ShowTolerance value={data.tolerance} /> */}

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
