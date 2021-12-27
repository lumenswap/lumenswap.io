import Head from 'next/head';
import urlMaker from 'helpers/urlMaker';
import ServerSideLoading from 'components/ServerSideLoading';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';
import RoundData from './RoundData';

const BoardsPage = ({ rounds }) => (
  <>
    <div className="container-fluid">
      <Head>
        <title>Lottery Board | Lumenswap</title>
        <link
          rel="canonical"
          herf={`${process.env.REACT_APP_HOST}${urlMaker.lottery.root()}`}
        />
      </Head>
      <LotteryHeader />
    </div>
    <ServerSideLoading>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.board}>Board</h1>
        </div>
        <RoundData rounds={rounds} />
      </div>
    </ServerSideLoading>
  </>
);

export default BoardsPage;
