import Header from 'components/Header';
import Head from 'next/head';
import LoginRequired from 'components/LoginRequired';
import { useSelector } from 'react-redux';
import OrderData from './OrderData';
import styles from './styles.module.scss';

function OrderPage() {
  const isLogged = useSelector((state) => state.user.logged);
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
          <div className={styles.order}>Order</div>
          {isLogged ? <div className={styles['cancel-btn']}>Cancel all open orders</div> : ''}
        </div>
        {isLogged ? <OrderData /> : <LoginRequired text="To see the Orders and trades, please connect your account." />}
      </div>
    </>
  );
}

export default OrderPage;
