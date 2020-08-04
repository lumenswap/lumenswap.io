import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Loading = ({ size }) => (
  <div className={styles.loading} style={{ height: `${size}px`, width: `${size}px` }} />
);

Loading.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Loading;
