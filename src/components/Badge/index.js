import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

// error | success | info
const Badge = ({ variant, content }) => (
  <div className={classNames(styles.badge, styles[`badge-${variant}`])}>
    {content}
  </div>
);

Badge.propTypes = {
  variant: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Badge;
