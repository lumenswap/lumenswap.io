import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import BN from 'helpers/BN';
import sevenDigit from 'helpers/sevenDigit';
import styles from 'pages/swap/styles.module.scss';

export default function ExchangeRate({ estimatedPrice, control, loading }) {
  const [reverse, setReverse] = useState(true);
  const formValues = useWatch({ control });

  if (!formValues.from.amount || new BN(formValues.from.amount).isEqualTo(0)) {
    return null;
  }

  let pricePer;
  if (!reverse) {
    pricePer = new BN(estimatedPrice).div(formValues.from.amount).toString();
  } else {
    pricePer = new BN(formValues.from.amount).div(estimatedPrice).toString();
  }

  const leftSide = !reverse
    ? formValues.from.asset.details.getCode()
    : formValues.to.asset.details.getCode();
  const rightSide = !reverse
    ? formValues.to.asset.details.getCode()
    : formValues.from.asset.details.getCode();

  return (
    <p className={styles.info}>
      {loading ? 'Loading' : (
        <>
          1 {leftSide} = {sevenDigit(pricePer)} {rightSide}
          <span
            className="icon-arrow-repeat"
            style={{ cursor: 'pointer' }}
            onClick={() => setReverse((i) => !i)}
          />
        </>
      )}
    </p>
  );
}
