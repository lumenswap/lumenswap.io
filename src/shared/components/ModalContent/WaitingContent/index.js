import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.less';

const WaitingContent = ({ message }) => (
  <>
    <div className={classNames(styles.loading, 'mx-auto d-block')} />
    <h1 className={styles.message}>Waiting for sign transaction</h1>
  </>
);

WaitingContent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default WaitingContent;
