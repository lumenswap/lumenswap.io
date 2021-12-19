import CTable from 'components/CTable';
import { searchTikcets } from 'api/lottery';
import { useEffect, useState } from 'react';
import tableHeaders from './ticketTableHeaders';
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
        noDataMessage={NoDataMessage}
        loading={searchedTickets === null}
      />
    </div>
  );
};

export default Tickets;
