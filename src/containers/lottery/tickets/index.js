import CTable from 'components/CTable';
import TableDropDown from 'containers/lottery/tickets/TableDropDown';
import Head from 'next/head';
import CPagination from 'components/CPagination';
import { useEffect, useState, useRef } from 'react';
import Input from 'components/Input';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAllRounds, searchTikcets } from 'api/lottery';
import urlMaker from 'helpers/urlMaker';
import tableHeaders from './tableHeaders';
import LotteryHeader from '../LotteryHeader';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>You have no ticket</div>
  </div>
);

const MyTicketsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rounds, setRounds] = useState(null);
  const [selectedRound, setSelectedRound] = useState({ value: null, text: 'All Tickets' });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  const [searchedTickets, setSearchedTickets] = useState(null);
  const isLogged = useSelector((state) => state.user.logged);
  const address = useSelector((state) => state.user.detail.address);
  const router = useRouter();
  const timeOutRef = useRef(null);
  const loading = searchedTickets === null;

  useEffect(() => {
    if (!isLogged) router.push(urlMaker.lottery.root());
  }, []);

  useEffect(() => {
    async function fetchInitialData() {
      if (isLogged) {
        setSearchedTickets(null);
        const query = { address, page, limit: 10 };

        if (selectedRound && selectedRound?.value) query.round = selectedRound.value;
        if (searchQuery) query.ticket = searchQuery;

        const fetchedTickets = await searchTikcets(query);

        setPages(fetchedTickets.data.totalPages);
        setPage(fetchedTickets.data.currentPage);
        setSearchedTickets(fetchedTickets.data.data);
      }
    }

    fetchInitialData();
  }, [selectedRound, searchQuery, page]);

  useEffect(() => {
    async function fetchRounds() {
      const fetchedRounds = await getAllRounds();

      const dropDownItems = fetchedRounds.data.map((round) => ({
        value: round.number,
        text: `Round #${round.number}`,
      }));
      setRounds([{ text: 'All Tickets', value: null }, ...dropDownItems]);
    }

    fetchRounds();
  }, []);

  async function handleSelectRound(round) {
    if (round.value !== selectedRound.value) {
      setSelectedRound(round);
      // setPage(null);
      // setPages(null);
    }
  }

  async function handleSearch(e) {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(async () => {
      setSearchQuery(e.target.value);
    }, 700);
  }

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>My Tickets | Lumenswap</title>
          <link
            rel="canonical"
            herf={`${process.env.REACT_APP_HOST}${urlMaker.lottery.tickets()}`}
          />
        </Head>
        <LotteryHeader />
      </div>
      <div className={styles.main}>
        <div style={{ marginBottom: 24 }} className={classNames(styles.title, 'd-flex justify-content-between')}>
          <h1 className={styles.board}>My Tickets</h1>
          <TableDropDown defaultOption={selectedRound} onChange={handleSelectRound} items={rounds} placeholder="All Tickets" />
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <Input
                type="text"
                placeholder="Enter your ticket ID"
                onChange={handleSearch}
                height={40}
                fontSize={15}
                className={styles.input}
              />
            </div>
          </div>
          <CTable
            rowFix={{ rowNumbers: 10, rowHeight: 55, headerRowHeight: 49 }}
            className={styles.table}
            columns={tableHeaders}
            dataSource={searchedTickets}
            noDataMessage={NoDataMessage}
            loading={loading}
          />
        </div>

        {!loading && searchedTickets.length > 0
        && (
        <div style={{ marginTop: 24 }} className="d-flex">
          <CPagination
            pages={pages}
            currentPage={page}
            onPageClick={(newPage) => {
              setPage(newPage);
            }}
          />
        </div>
        )}
      </div>
    </>
  );
};

export default MyTicketsPage;
