import React from 'react';
import { ReactComponent as Bars } from 'assets/images/bars.svg';
import styles from './styles.module.scss';

const FetchDataLoading = () => (
  <div className={styles.container}>
    <Bars />
  </div>
);

export default FetchDataLoading;
