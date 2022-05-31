import Head from 'next/head';
import { useSelector } from 'react-redux';
import LoginRequired from 'components/LoginRequired';
import RewardHeader from 'containers/reward/RewardHeader';
import ServerSideLoading from 'components/ServerSideLoading';
import rewardConnectIcon from 'assets/images/rewardNotConnected.png';
import rewardConnectDarkIcon from 'assets/images/reward-login-dark.png';
import useCurrentTheme from 'hooks/useCurrentTheme';
import styles from './styles.module.scss';
import RewardContent from './RewardContent';

const RewardPage = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const currentTheme = useCurrentTheme();
  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Reward | Lumenswap</title>
        </Head>
        <RewardHeader />
      </div>
      <ServerSideLoading>
        <div className={styles.main}>
          <h1 className={styles['page-title']}>Reward</h1>
          {isLogged ? <RewardContent />
            : <LoginRequired logo={currentTheme === 'light' ? rewardConnectIcon : rewardConnectDarkIcon} text="To see the reward statistics, please connect your account." /> }
        </div>
      </ServerSideLoading>
    </>
  );
};

export default RewardPage;
