import Loading from 'components/Loading';
import CTable from 'components/CTable';
import LotteryHead from 'containers/lottery/LotteryHead';
import { useEffect, useState } from 'react';
import tableHeaders from './tableHeaders';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>You have no Ticketes.</div>
  </div>
);

const index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedRounds = await new Promise((resolve) => setTimeout(() => {
        resolve([
          { title: 'Round #1', status: 'Live', image: 'tesla.jpg' },
          { title: 'Round #1', status: 'Ended', image: 'tesla.jpg' },
        ]);
      }, 1500));

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="container-fluid">
          <LotteryHead title="My Tickets" />
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
        <LotteryHead title="My Tickets" />
        <LotteryHeader />
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.board}>My Tickets</h1>
        </div>
        <CTable
          className={styles.table}
          columns={tableHeaders}
          dataSource={[1, 2, 3, 4, 5]}
          noDataMessage={NoDataMessage}
        />
      </div>
    </>
  );
};

export default index;
