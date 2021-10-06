import CTable from 'components/CTable';
import TableDropDown from 'components/TableDropDown';
import LotteryHead from 'containers/lottery/LotteryHead';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import Input from 'components/Input';
import classNames from 'classnames';
import tableHeaders from './tableHeaders';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>You have no ticket</div>
  </div>
);

const index = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(null);
  const [rounds, setRounds] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);

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

  return (
    <>
      <div className="container-fluid">
        <LotteryHead title="My Tickets" />
        <LotteryHeader />
      </div>
      <div className={styles.main}>
        <div style={{ marginBottom: 24 }} className={classNames(styles.title, 'd-flex justify-content-between')}>
          <h1 className={styles.board}>My Tickets</h1>
          <TableDropDown onChange={() => {}} placeHolder="All tickets" items={rounds?.map((round) => round.title)} />
        </div>
        <div className={styles.tableContainer}>
          {!loading
          && (
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
          )}
          <CTable
            className={styles.table}
            columns={tableHeaders}
            dataSource={tickets}
            noDataMessage={NoDataMessage}
            loading={loading}
          />
        </div>

        {!loading
        && (
        <div style={{ marginTop: 24 }} className="d-flex">
          <Pagination
            pages={pages}
            currentPage={page}
            onPageClick={(newPage) => setPage(newPage)}
          />
        </div>
        )}
      </div>
    </>
  );
};

export default index;