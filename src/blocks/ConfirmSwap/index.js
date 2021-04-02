import classNames from 'classnames';
import Button from 'components/Button';
import Tooltips from 'components/Tooltip';
import { useEffect, useState } from 'react';
import sevenDigit from 'helpers/sevenDigit';
import BN from 'helpers/BN';
import fetchMarketPrice from 'helpers/fetchMarketPrice';
import { openModalAction } from 'actions/modal';
import WaitingContent from 'blocks/WaitingContent';
import store from 'store';
import isSameAsset from 'helpers/isSameAsset';
import generateSwapTRX from 'stellar-trx/generateSwapTRX';
import TransactionResponse from 'blocks/TransactionResponse';
import signForThem from 'walletIntegeration/signForThem';
import { loginTypes } from 'reducers/user';
import ColorizedPriceImpact from 'pages/Home/ColorizedPriceImpact';
import appConsts from 'appConsts';
import styles from './styles.module.scss';

const ConfirmSwap = ({ data }) => {
  const [reverse, setReverse] = useState(true);
  const [marketPrice, setMarketPrice] = useState(0);
  const [loading, setLoading] = useState(false);

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
    openModalAction({
      modalProps: {
        hasClose: false,
      },
      content: <WaitingContent message="Waiting for Sign" />,
    });

    const storeData = store.getState();
    const found = storeData.userBalance.find((i) => isSameAsset(i.asset, data.to.asset.details));

    let trx;
    try {
      trx = await generateSwapTRX({
        checkout: {
          ...data,
          fromAddress: storeData.user.detail.address,
          toAddress: storeData.user.detail.address,
        },
        needToTrust: !found,
      }, storeData.user.loginType === loginTypes.LEDGER_S);
    } catch (e) {
      console.error(e);
      openModalAction({
        modalProps: {},
        content: <TransactionResponse
          message="Failed to generate your swap transaction"
          status="failed"
          title="Failed"
        />,
      });
    }

    let trxHash;
    try {
      trxHash = await signForThem(trx);
      openModalAction({
        modalProps: {},
        content: <TransactionResponse
          message={trxHash}
          status="success"
          title="Success Transaction"
          btnText="View on Explorer"
          btnType="link"
          btnLink={`${process.env.REACT_APP_LUMENSCAN_URL}/txns/${trxHash}`}
        />,
      });
    } catch (e) {
      console.error(e);
      openModalAction({
        modalProps: {},
        content: <TransactionResponse
          message={e.message}
          status="failed"
          title="Failed"
        />,
      });
    }
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
            <Tooltips id="minimum" text={appConsts.tooltip.min}><span className="icon-question-circle" /></Tooltips>
          </div>
          <div className={classNames(styles.value)}>{loading ? 'Loading' : sevenDigit(calculatedMin.toString())} {data.to.asset.details.getCode()}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.label}>Price impact
            <Tooltips id="impact" text={appConsts.tooltip.priceImpact}><span className="icon-question-circle" /></Tooltips>
          </div>
          <div className={styles.value}><ColorizedPriceImpact impact={finalPriceImpact} /></div>
        </div>
        <Button
          htmlType="submit"
          variant="primary"
          content="Confirm"
          fontSize={18}
          fontWeight="Medium"
          size="100%"
          className="mt-4"
          onClick={SwapTheTokens}
        />
      </div>
    </div>
  );
};

export default ConfirmSwap;
