import CTable from 'components/CTable';
import { getAllRoundTickets, searchTikcets } from 'api/lottery';
import { useEffect, useRef, useState } from 'react';
import tableHeaders from './ticketTableHeaders';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>There are no tickets</div>
  </div>
);

const Tickets = ({
  searchQuery, round,
}) => {
  const [searchedTickets, setSearchedTickets] = useState(null);

  const timeOutRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedTickets = await getAllRoundTickets(round.number);
        setSearchedTickets(fetchedTickets.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (searchQuery === null || searchQuery === '') {
      fetchData();
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = setTimeout(async () => {
        setSearchedTickets(null);
        const result = await searchTikcets(
          { searchTransactionId: searchQuery, limit: 10 },
          round.number,
        );
        setSearchedTickets(result.data.data);
      }, 700);
    }

    if (searchQuery !== null && searchQuery !== '') {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div style={{ background: 'white', marginLeft: -24, marginTop: 15 }}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        dataSource={searchedTickets}
        noDataMessage={NoDataMessage}
        loading={searchedTickets === null}
      />
    </div>
  );
};

export default Tickets;
