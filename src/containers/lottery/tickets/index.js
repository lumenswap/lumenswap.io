import Loading from 'components/Loading';
import CTable from 'components/CTable';
import TableDropDown from 'components/TableDropDown';
import LotteryHead from 'containers/lottery/LotteryHead';
import { useEffect, useState } from 'react';
import Input from 'components/Input';
import classNames from 'classnames';
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
  const [tickets, setTickets] = useState(null);
  const [rounds, setRounds] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedTickets = await new Promise((resolve) => setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 1500));

      const fetchedRounds = await new Promise((resolve) => setTimeout(() => {
        resolve([
          { title: 'Round #1', status: 'Live', image: 'tesla.jpg' },
          { title: 'Round #1', status: 'Ended', image: 'tesla.jpg' },
        ]);
      }, 1500));

      setLoading(false);
      setRounds(fetchedRounds);
      setTickets(fetchedTickets);
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
        <div style={{ marginBottom: 24 }} className={classNames(styles.title, 'd-flex justify-content-between')}>
          <h1 className={styles.board}>My Tickets</h1>
          <TableDropDown placeHolder="All tickets" items={rounds?.map((round) => round.title)} />
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <Input
                name="ticketID"
                id="ticketID"
                type="text"
                placeholder="Enter your ticket ID"
                onChange={() => {}}
                height={40}
                fontSize={15}
                className={styles.input}
              />
            </div>
          </div>
          <CTable
            className={styles.table}
            columns={tableHeaders}
            dataSource={tickets}
            noDataMessage={NoDataMessage}
          />
        </div>
      </div>
    </>
  );
};

export default index;
