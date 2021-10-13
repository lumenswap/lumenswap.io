import Loading from 'components/Loading';
import LotteryHead from 'containers/lottery/LotteryHead';
import { useEffect, useState } from 'react';
import { getAllRounds } from 'api/lottery';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';
import RoundData from './RoundData';

const index = () => {
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
