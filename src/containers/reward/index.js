import Header from 'components/Header';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import styles from './styles.module.scss';
import { fetchAddressReward } from '../../api/rewards';
import UserData from './UserData';
import Login from './Login';

const RewardPage = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const userAdress = useSelector((state) => state.user.detail.address);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    function loadingUserData() {
      fetchAddressReward(userAdress)
        .then((res) => setUserData(res)).catch((err) => console.log(err));
    }
    if (isLogged) {
      loadingUserData();
    }
  }, [userAdress, isLogged]);

  if (isLogged && userData === null) {
    return <div className={styles['loading-container']}><Loading size={21} /></div>;
  }

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Lumenswap | Reward</title>
        </Head>
        <Header />
      </div>

      <div className={styles.main}>
        <div className={styles['page-title']}>Dashboard</div>
        {isLogged ? <UserData userData={userData} /> : <Login /> }
      </div>

    </>
  );
};

export default RewardPage;
