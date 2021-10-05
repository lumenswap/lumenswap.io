import Loading from 'components/Loading';
import LotteryHead from 'containers/lottery/LotteryHead';
import { useEffect, useState } from 'react';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';

const index = () => {
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedRound = await new Promise((resolve) => setTimeout(() => {
        resolve([
          { title: 'Round #1', status: 'Live', image: 'tesla.jpg' },
        ]);
      }, 1500));

      setRound(fetchedRound);
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
      </div>
    </>
  );
};

export default index;
