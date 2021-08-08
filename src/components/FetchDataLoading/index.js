import React from 'react';
import Bars from 'assets/images/bars.svg';
import styles from './styles.module.scss';

const FetchDataLoading = () => (
  <div className={styles.container}>
    <img src={Bars} />
  </div>
);

export default FetchDataLoading;
