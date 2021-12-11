import classNames from 'classnames';
import Button from 'components/Button';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import { useEffect, useState } from 'react';
import sevenDigit from 'helpers/sevenDigit';
import BN from 'helpers/BN';
import fetchMarketPrice from 'helpers/fetchMarketPrice';
import isSameAsset from 'helpers/isSameAsset';
import generateSwapTRX from 'stellar-trx/generateSwapTRX';
import { loginTypes } from 'reducers/user';
import ColorizedPriceImpact from 'components/complex/LumenSwapSwap/ColorizedPriceImpact';
import appConsts from 'appConsts';
import showSignResponse from 'helpers/showSignResponse';
import showGenerateTrx from 'helpers/showGenerateTrx';
import { initializeStore } from 'store';
import { useDispatch } from 'react-redux';

import styles from './styles.module.scss';

const ConfirmSwap = ({ data }) => {
  const [reverse, setReverse] = useState(true);
  const [marketPrice, setMarketPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetchMarketPrice(data.from.asset.details, data.to.asset.details).then((counterPrice) => {
      if (counterPrice) {
        setMarketPrice(counterPrice);
      }
    }).finally(() => setLoading(false));
  }, [JSON.stringify(data)]);

  if (!data.from.amount || new BN(data.from.amount).isEqualTo(0)) {
    return null;
  }

  let pricePer;
  if (!reverse) {
    pricePer = new BN(data.estimatedPrice).div(data.from.amount).toString();
  } else {
    pricePer = new BN(data.from.amount).div(data.estimatedPrice).toString();
  }

  const leftSide = !reverse
    ? data.from.asset.details.getCode()
    : data.to.asset.details.getCode();
  const rightSide = !reverse
    ? data.to.asset.details.getCode()
    : data.from.asset.details.getCode();

  const calculatedMin = new BN(data.estimatedPrice)
    .times(new BN(1).minus(new BN(data.priceSpread).div(100)));
  const priceImpact = new BN(1)
    .minus(new BN(data.estimatedPrice).div(new BN(marketPrice).times(data.from.amount)))
    .times(100);

  let finalPriceImpact = priceImpact.isNaN() ? new BN('0') : priceImpact;
  if (finalPriceImpact.isLessThan(0)) {
    finalPriceImpact = new BN(0);
  }

  async function SwapTheTokens() {
    function func() {
      const store = initializeStore();
      const storeData = store.getState();
      const found = storeData.userBalance.find((i) => isSameAsset(i.asset, data.to.asset.details));
      return generateSwapTRX({
        checkout: {
          ...data,
          fromAddress: storeData.user.detail.address,
          toAddress: storeData.user.detail.address,
        },
        needToTrust: !found,
      }, storeData.user.loginType === loginTypes.LEDGER_S);
    }

    showGenerateTrx(func, dispatch)
      .then((trx) => showSignResponse(trx, dispatch))
      .catch(console.error);

    // await showSignResponse(trx);
  }

  return (
    <div>
      <div className={styles['swap-container']}>
        <div className="d-flex align-items-center"><img src={data.from.asset.logo} width={20} height={20} alt="logo" />{data.from.amount}</div>
        <div>{data.from.asset.details.getCode()}</div>
      </div>
      <span className={classNames('icon-arrow-down', styles.arrow)} />
      <div className={styles['swap-container']}>
        <div className="d-flex align-items-center"><img src={data.to.asset.logo} width={20} height={20} alt="logo" />{data.estimatedPrice}</div>
        <div>{data.to.asset.details.getCode()}</div>
      </div>
      <p className={styles.message}>
        output is estimated. you will receive at least{' '}
        {sevenDigit(calculatedMin.toString())}{' '}
        {data.to.asset.details.getCode()} or the transaction will revert.
      </p>
      <div className={styles.info}>
        <div className={styles.container}>
          <div className={styles.label}>Price
          </div>
          <div className={styles.value}>1 {leftSide} = {sevenDigit(pricePer)} {rightSide}
            <span className="icon-arrow-repeat" style={{ cursor: 'pointer' }} onClick={() => setReverse((i) => !i)} />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.label}>Minimum received
            <Tooltips id="minimum" text={<PrimaryTooltip text={appConsts.tooltip.min} />}><span className="icon-question-circle" /></Tooltips>
          </div>
          <div className={classNames(styles.value)}>{loading ? 'Loading' : sevenDigit(calculatedMin.toString())} {data.to.asset.details.getCode()}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.label}>Price impact
            <Tooltips id="impact" text={<PrimaryTooltip text={appConsts.tooltip.priceImpact} />}><span className="icon-question-circle" /></Tooltips>
          </div>
          <div className={styles.value}><ColorizedPriceImpact impact={finalPriceImpact} /></div>
        </div>
        <Button
          htmlType="submit"
          variant="primary"
          content="Confirm"
          fontSize={18}
          fontWeight={500}
          size="100%"
          className="mt-4"
          onClick={SwapTheTokens}
        />
      </div>
    </div>
  );
};

export default ConfirmSwap;
