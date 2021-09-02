import Head from 'next/head';
import { useSelector } from 'react-redux';
import LoginRequired from 'components/LoginRequired';
import ObmHeader from 'components/ObmHeader';
import rewardConnectIcon from '../../assets/images/rewardNotConnected.png';
import styles from './styles.module.scss';
import RewardContent from './RewardContent';

const RewardPage = () => {
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Reward | Lumenswap</title>
        </Head>
        <ObmHeader />
      </div>

      <div className={styles.main}>
        <h1 className={styles['page-title']}>Reward</h1>
        {isLogged ? <RewardContent />
          : <LoginRequired logo={rewardConnectIcon} text="To see the reward statistics, please connect your account." /> }
      </div>

    </>
  );
};

export default RewardPage;
