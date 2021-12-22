import CTable from 'components/CTable';
import { searchTikcets } from 'api/lottery';
import { useEffect, useState } from 'react';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateTransactionURL, generateAddressURL } from 'helpers/explorerURLGenerator';
import moment from 'moment';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import eyeShowIcon from 'assets/images/eye-show-icon.png';
import { openModalAction } from 'actions/modal';
import ShowTicketInfo from './ShowTicketInfo';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>There is no ticket</div>
  </div>
);

const Tickets = ({
  searchQuery, round,
}) => {
  const [searchedTickets, setSearchedTickets] = useState(null);

  const dispatch = useDispatch();

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
        <a style={{ textDecoration: 'none' }} href={generateAddressURL(data.address)} target="_blank" rel="noreferrer" className={styles.ticketId}>
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
            <Image
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

  useEffect(() => {
    async function fetchData() {
      try {
        setSearchedTickets(null);
        const query = { limit: 10, round: round.number };
        if (searchQuery !== null && searchQuery !== '') {
          query.ticket = searchQuery;
        }

        const fetchedTickets = await searchTikcets(query);
        setSearchedTickets(fetchedTickets.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [searchQuery]);

  return (
    <div style={{ background: 'white', marginLeft: -24, marginTop: 15 }}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        dataSource={searchedTickets}
        noDataComponent={NoDataMessage}
        loading={searchedTickets === null}
      />
    </div>
  );
};

export default Tickets;
