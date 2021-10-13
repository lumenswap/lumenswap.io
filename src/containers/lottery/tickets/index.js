import CTable from 'components/CTable';
import TableDropDown from 'components/TableDropDown';
import LotteryHead from 'containers/lottery/LotteryHead';
import CPagination from 'components/CPagination';
import { useEffect, useState } from 'react';
import Input from 'components/Input';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAllRounds, getMyTickets } from 'api/lottery';
import urlMaker from 'helpers/urlMaker';
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
  const [selectedRound, setSelectedRound] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const isLogged = useSelector((state) => state.user.logged);
  const address = useSelector((state) => state.user.detail.address);
  const router = useRouter();

  useEffect(() => {
    async function fetchInitialData() {
      const fetchedRounds = await getAllRounds();
      const fetchedTickets = await getMyTickets(address, fetchedRounds.data[0].number, page);

      setLoading(false);
      setPages(fetchedTickets.data.totalPages);
      setPage(fetchedTickets.data.currentPage);
      setSelectedRound(fetchedRounds.data[0]);
      setRounds(fetchedRounds.data);
      setTickets(fetchedTickets.data);
    }

    if (address) fetchInitialData();
    else router.push(urlMaker.lottery.root());
  }, []);

  async function fetchData() {
    setLoading(true);
    const fetchedTickets = await getMyTickets(address, selectedRound.number, page);
    setLoading(false);
    setPages(fetchedTickets.data.totalPages);
    setPage(fetchedTickets.data.currentPage);
    setTickets(fetchedTickets.data);
  }

  async function handleSelectRound(round) {
    if (round !== selectedRound) {
      setSelectedRound(round);
      fetchData();
    }
  }

  let searchedTickets = tickets?.data;

  if (searchQuery && searchQuery.length > 0) {
    searchedTickets = tickets.data
      .filter((ticket) => ticket.transactionId.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.lottery.root());
    }
  }, [isLogged]);

  return (
    <>
      <div className="container-fluid">
        <LotteryHead title="My Tickets" />
        <LotteryHeader />
      </div>
      <div className={styles.main}>
        <div style={{ marginBottom: 24 }} className={classNames(styles.title, 'd-flex justify-content-between')}>
          <h1 className={styles.board}>My Tickets</h1>
          <TableDropDown onChange={handleSelectRound} placeHolder="All tickets" items={rounds} itemKey="number" itemText="Round #" />
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
            dataSource={searchedTickets}
            noDataMessage={NoDataMessage}
            loading={loading}
          />
        </div>

        {!loading
        && (
        <div style={{ marginTop: 24 }} className="d-flex">
          <CPagination
            pages={pages}
            currentPage={page}
            onPageClick={(newPage) => {
              setPage(newPage);
              fetchData();
            }}
          />
        </div>
        )}
      </div>
    </>
  );
};

export default index;
