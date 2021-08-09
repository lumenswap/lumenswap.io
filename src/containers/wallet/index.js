import React from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import classNames from 'classnames';
import DetailedInfo from 'components/DetailedInfo';
import Table from 'components/Table';
import sampleLogo from 'assets/images/btc-logo.png';
import styles from './styles.module.scss';

const wallet = () => {
  const details = [
    { title: 'Total balance', xlm: '55,45', value: '45,5' },
    { title: 'Reserved balance', xlm: '12,4', value: '13,4' },
  ];

  const tableHeader = ['Assets', 'Balance', 'Action'];

  const tableRows = () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((row, index) => (
    <tr key={index}>
      <td>
        <div className="d-flex align-items-center">
          <img src={sampleLogo} width={32} height={32} alt="logo" />
          <span className={styles['td-name']}>
            <span>DAI</span>
            <span>Dinora</span>
          </span>
        </div>
      </td>
      <td>70.733</td>
      <td>
        <div className="d-flex">
          <a href="/" className="mr-5">Swap</a>
          <a href="/" className="mr-5">Trade</a>
          <a href="/">Send</a>
        </div>
      </td>
    </tr>
  ));

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
          <div className={classNames(styles.card, styles['card-table'])}>
            <Table className={styles.table} tableRows={tableRows()} tableHead={tableHeader} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default wallet;
