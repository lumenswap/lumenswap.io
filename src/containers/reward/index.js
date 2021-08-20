import Header from 'components/Header';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import { fetchAddressReward } from 'api/rewards';
import LoginRequired from 'components/LoginRequired';
import styles from './styles.module.scss';
import RewardContent from './RewardContent';

const RewardPage = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const userAdress = useSelector((state) => state.user.detail.address);
  const [rewardStats, setRewardStats] = useState(null);

  useEffect(() => {
    function loadingUserData() {
      fetchAddressReward(userAdress)
        .then((res) => setRewardStats(res)).catch((err) => console.log(err));
    }
    if (isLogged) {
      loadingUserData();
    }
  }, [userAdress, isLogged]);

  if (isLogged && rewardStats === null) {
    return (
      <div className="container-fluid">
        <Header />
        <div className={styles['loading-container']}>
          <Loading size={48} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Reward | Lumenswap</title>
        </Head>
        <Header />
      </div>

      <div className={styles.main}>
        <h1 className={styles['page-title']}>Dashboard</h1>
        {isLogged ? <RewardContent rewardStats={rewardStats} />
          : <LoginRequired text="To see the reward statistics, please connect your account." /> }
      </div>

    </>
  );
};

export default RewardPage;
