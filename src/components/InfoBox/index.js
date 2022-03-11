import classNames from 'classnames';
import Loading from 'components/Loading';
import styles from './styles.module.scss';
import InfoBoxItem from './InfoBoxItem';

const InfoBox = ({
  title, rows, data, bordered, className, sidePadding,
}) => {
  if (!data) {
    return (
      <div className={classNames(styles.main, className)}>
        <div style={{ position: 'relative' }} className={styles.rows}>
          {title && <div className={styles['header-title']}>{title}</div>}
          <span style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} className="position-absolute">
            <Loading size={40} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.main, className)}>
      <div style={!sidePadding ? { paddingLeft: '16px', paddingRight: '16px' } : {}} className={classNames(styles.rows, 'parent', bordered && 'p-0 h-auto')}>
        {title && <div className={styles['header-title']}>{title}</div>}
        {rows?.map((row, index) => (
          <InfoBoxItem
            key={index}
            data={data}
            item={row}
            bordered={bordered}
            sidePadding={sidePadding ?? null}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoBox;
