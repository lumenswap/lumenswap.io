import classNames from 'classnames';
import styles from './styles.module.scss';
import InfoBoxItem from './InfoBoxItem';

const InfoBox = ({
  title, rows, data, className,
}) => (
  <div className={classNames(styles.main, className)}>
    <div className={styles.rows}>
      <div className={styles['header-title']}>{title}</div>
      {rows.map((row) => <InfoBoxItem data={data} item={row} />)}
    </div>
  </div>
);

export default InfoBox;
