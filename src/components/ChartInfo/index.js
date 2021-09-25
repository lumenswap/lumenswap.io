import styles from './styles.module.scss';

const ChartInfo = ({ value, time }) => (
  <div className={styles.data}>
    <div className={styles.price}>{value}</div>
    <div className={styles.date}>{time}</div>
  </div>
);

export default ChartInfo;
