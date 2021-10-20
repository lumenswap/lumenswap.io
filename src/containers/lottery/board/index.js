import Loading from 'components/Loading';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getAllRounds } from 'api/lottery';
import urlMaker from 'helpers/urlMaker';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';
import RoundData from './RoundData';

const BoardsPage = () => {
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedRounds = await getAllRounds();
      setRounds(fetchedRounds.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
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
        <div className={styles.loadingContainer}>
          <Loading size={50} />
        </div>
      </>
    );
  }

  return (
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
      <div className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.board}>Board</h1>
        </div>
        <RoundData rounds={rounds} />
      </div>
    </>
  );
};

export default BoardsPage;
