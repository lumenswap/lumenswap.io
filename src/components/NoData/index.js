import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const NoData = ({ message }) => (
  <div className={styles.empty}>{message}</div>
);

NoData.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoData;
