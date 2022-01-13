import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Progressbar = ({ label, value }) => (
  <div className={styles.box}>
    <div className="d-flex justify-content-between align-items-center">
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>%{value}</div>
    </div>
    <div className={classNames(styles.progress, 'progress')}>
      <div
        className={classNames(styles['progress-bar'], 'progress-bar')}
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={`${value}`}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  </div>
);

Progressbar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Progressbar;
