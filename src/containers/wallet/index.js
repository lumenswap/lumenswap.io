import React from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import classNames from 'classnames';
import DetailedInfo from 'components/DetailedInfo';
import styles from './styles.module.scss';

const wallet = () => {
  const details = [
    { title: 'Total balance', xlm: '55,45', value: '45,5' },
    { title: 'Reserved balance', xlm: '12,4', value: '13,4' },
  ];
  return (
    <div>
      <Head>
        <title>Lumenswap | wallet</title>
      </Head>
      <div className="container-fluid main">
        <Header />
        <div className={classNames('layout-inside', styles.layout)}>
          <h1 className="title my-0">Wallet</h1>
          <div className={classNames(styles.card, styles['card-detail'])}>
            <DetailedInfo details={details} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default wallet;
