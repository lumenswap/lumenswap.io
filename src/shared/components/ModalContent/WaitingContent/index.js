import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const WaitingContent = ({ message }) => (
  <>
    <div className={classNames(styles.loading, 'mx-auto d-block')} />
    <h1 className={styles.message}>{message}</h1>
  </>
);

export default WaitingContent;
