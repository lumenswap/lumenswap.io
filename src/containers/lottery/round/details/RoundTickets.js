import CTable from 'components/CTable';
import Head from 'next/head';
import CPagination from 'components/CPagination';
import { useEffect, useState, useRef } from 'react';
import Input from 'components/Input';
import classNames from 'classnames';
import { openModalAction } from 'actions/modal';
import { searchTikcets } from 'api/lottery';
import urlMaker from 'helpers/urlMaker';
import Breadcrumb from 'components/BreadCrumb';
import moment from 'moment';
import minimizeAddress from 'helpers/minimizeAddress';
import eyeShowIcon from 'assets/images/eye-show-icon.png';
import { generateTransactionURL, generateAddressURL } from 'helpers/explorerURLGenerator';
import { useDispatch } from 'react-redux';
import ServerSideLoading from 'components/ServerSideLoading';
import ShowTicketInfo from '../ShowTicketInfo';
import LotteryHeader from '../../LotteryHeader';
import styles from '../../style.module.scss';

const AllTicketsPage = ({ round }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  const [searchedTickets, setSearchedTickets] = useState(null);
  const timeOutRef = useRef(null);
  const loading = searchedTickets === null;

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchInitialData() {
      setSearchedTickets(null);
      const query = {
        page, limit: 20, round: round.number,
      };

      if (searchQuery) query.ticket = searchQuery.toLowerCase();

      const fetchedTickets = await searchTikcets(query);

      setPages(fetchedTickets.data.totalPages);
      setPage(fetchedTickets.data.currentPage);
      setSearchedTickets(fetchedTickets.data.data);
    }

    fetchInitialData();
  }, [searchQuery, page]);

  async function handleSearch(e) {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(async () => {
      setPage(1);
      setSearchQuery(e.target.value);
    }, 700);
  }

  const breadCrumbData = [
    {
      name: 'Board',
      url: urlMaker.lottery.root(),
    },
    {
      name: `Round #${round.number}`,
      url: urlMaker.lottery.round.root(round.number),
    },
    {
      name: 'Tickets',
    },
  ];

  const handleShowTicketInfo = (data) => {
    dispatch(openModalAction({
      modalProps: {
        title: 'Ticket info',
        className: styles['show-ticket-modal'],
        mainClassName: styles['show-ticket-modal-main'],
      },
      content: <ShowTicketInfo data={data} />,
    }));
  };

  const tableHeaders = [
    {
      title: 'Ticket ID',
      dataIndex: 'ticketId',
      key: '1',
      render: (data) => (
        <a style={{ textDecoration: 'none' }} href={generateTransactionURL(data.transactionId)} target="_blank" rel="noreferrer" className={styles.ticketId}>
          {minimizeAddress(data.transactionId, 8)}
        </a>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: '2',
      render: (data) => (
        <a style={{ textDecoration: 'none' }} href={generateAddressURL(data.address, 4)} target="_blank" rel="noreferrer" className={styles.ticketId}>
          {minimizeAddress(data.address, 4)}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '3',
      render: (data) => (
        <div>
          {moment(data.ticketDate).fromNow()}
        </div>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '4',
      render: (data) => (
        <div className={styles['show-eye-icon-container']}>
          <div>
            <img
              onClick={() => handleShowTicketInfo(data)}
              className={styles['show-eye-icon']}
              src={eyeShowIcon}
              width={16}
              height={13}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Round {round.number} Tickets | Lumenswap</title>
          <link
            rel="canonical"
            herf={`${process.env.REACT_APP_HOST}${urlMaker.lottery.round.tickets(round.number)}`}
          />
        </Head>
        <LotteryHeader />
      </div>
      <ServerSideLoading>
        <div className={styles.main}>
          <div style={{ marginBottom: 24 }} className={classNames(styles.title, 'd-flex justify-content-between')}>
            <Breadcrumb
              className={styles.bread}
              spaceBetween={12}
              data={breadCrumbData}
            />
          </div>
          <div className={styles.tableContainer}>
            <div className={classNames(styles.inputContainer, 'd-flex justify-content-between align-items-center')}>
              <div className={styles.input}>
                <Input
                  type="text"
                  placeholder="Enter your ticket Id"
                  onChange={handleSearch}
                  height={40}
                  fontSize={15}
                  className={styles.input}
                />
              </div>
              <div className={styles['table-title']}>Tickets</div>
            </div>
            <CTable
              className={styles.table}
              columns={tableHeaders}
              dataSource={searchedTickets}
              noDataMessage="There is no ticket"
              loading={loading}
            />
          </div>

          {!loading && searchedTickets.length > 0
        && (
        <div style={{ marginTop: 24, marginBottom: 60 }} className="d-flex">
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
      </ServerSideLoading>
    </>
  );
};

export default AllTicketsPage;
