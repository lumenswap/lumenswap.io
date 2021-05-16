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
        <div
          className={classNames('col-auto mb-lg-0 mb-md-1 mb-sm-1 mb-1',
            styles.col, (item.status === 'bold') && styles.bold)}
          key={index}
        >
          <div className={styles.title}>{item.title}</div>
          {item.status === 'link'
            ? (
              <a
                className={classNames(styles.value, styles.link)}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >{item.value} <span className="icon-external" />
              </a>
            )
            : (
              <div className={classNames(styles.value, setStatusStyle(item.status))}>

                {item.value}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default DetailList;
