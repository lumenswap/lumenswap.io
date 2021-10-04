import Loading from 'components/Loading';
import LotteryHead from 'containers/lottery/LotteryHead';
import { useEffect, useState } from 'react';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';
import RoundData from './RoundData';

const index = () => {
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedRounds = await new Promise((resolve) => setTimeout(() => {
        resolve([
          { title: 'Round #1', status: 'Live', image: 'tesla.jpg' },
          { title: 'Round #1', status: 'Ended', image: 'tesla.jpg' },
        ]);
      }, 1500));

      setRounds(fetchedRounds);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="container-fluid">
          <LotteryHead title="Board" />
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
        <LotteryHead title="Board" />
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

export default index;
