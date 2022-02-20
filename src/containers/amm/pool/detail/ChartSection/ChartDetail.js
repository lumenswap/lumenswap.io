import humanizeAmount from 'helpers/humanizeAmount';
import BN from 'helpers/BN';
import moment from 'moment';
import styles from './styles.module.scss';

export default function ChartDetail({ currentValue, currentChart }) {
  let val = '-';
  if (currentValue) {
    if (currentChart === 'tvl') {
      val = humanizeAmount(currentValue?.tvl);
    }

    if (currentChart === 'volume') {
      val = humanizeAmount(new BN(currentValue?.volume).div(10 ** 7).toString());
    }

    if (currentChart === 'fee') {
      val = humanizeAmount(new BN(currentValue?.volume).div(10 ** 7).times(0.003).toString());
    }
  }

  return (
    <>
      <span className={styles['values-text']}>${val}</span>
      <span className={styles['values-date']}>{currentValue ? moment(currentValue.periodTime).utc().format('MMM DD, YYYY') : null}</span>
    </>
  );
}
