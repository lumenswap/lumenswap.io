import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const SwapInfo = ({ info }) => (
  <div className={styles.card}>
    <div className={styles.container}>
      <div className={styles.label}>Minimum received<span className="icon-question-circle" /></div>
      <div className={styles.info}>{info.minimum}</div>
    </div>
    <div className={styles.container}>
      <div className={styles.label}>Price spread<span className="icon-question-circle" /></div>
      <div className={styles.info}>{info.price}</div>
    </div>
    <div className={styles.container}>
      <div className={styles.label}>Path<span className="icon-question-circle" /></div>
      <div className={styles.path}>
        {info.path.map((path, index) => (
          <div className={styles['path-container']} key={index}>
            <span>{path.toUpperCase()}</span>
            <span className="icon-arrow-right" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

SwapInfo.propTypes = {
  info: PropTypes.object.isRequired,
};

export default SwapInfo;
