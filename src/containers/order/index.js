import Header from 'components/Header';
import Head from 'next/head';
import LoginRequired from 'components/LoginRequired';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import OrderData from './OrderData';
import styles from './styles.module.scss';

function OrderPage() {
  const isLogged = useSelector((state) => state.user.logged);
  const [showCancel, setShowCancel] = useState(true);

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Order | Lumenswap</title>
        </Head>
        <Header />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.order}>Order</h1>
          {isLogged && showCancel ? <span className={styles['cancel-btn']}>Cancel all open orders</span> : ''}
        </div>
        {isLogged ? <OrderData setShowCancel={setShowCancel} />
          : <LoginRequired text="To see the Orders and trades, please connect your account." />}
      </div>
    </>
  );
}

export default OrderPage;
