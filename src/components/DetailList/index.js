import classNames from 'classnames';
import styles from './styles.module.scss';

const DetailList = ({ list }) => {
  const setStatusStyle = (status) => {
    if (status === 'buy') {
      return 'color-buy';
    }

    if (status === 'sell') {
      return 'color-sell';
    }
    return null;
  };
  return (
    <div className="row">
      {list.map((item, index) => (
        <div className={classNames('col-auto', styles.col)} key={index}>
          <div className={styles.title}>{item.title}</div>
          <div className={classNames(styles.value, setStatusStyle(item.status))}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailList;
