import React from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import LoginRequired from 'components/LoginRequired';
import { useSelector } from 'react-redux';
import walletNotConnectedIcon from '../../assets/images/walletNotConnected.png';
import WalletData from './walletData';
import styles from './styles.module.scss';

function WalletPage() {
  const isLogged = useSelector((state) => state.user.logged);
  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Wallet | Lumenswap</title>
        </Head>
        <Header />
      </div>
      <div className={styles.main}>
        <h1 className={styles.title}>Wallet</h1>
        {isLogged ? <WalletData /> : (
          <LoginRequired
            logo={walletNotConnectedIcon}
            text="To see the wallet statistics, please connect your account"
          />
        )}
      </div>
    </>
  );
}

export default WalletPage;
