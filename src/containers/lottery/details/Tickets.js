import CTable from 'components/CTable';
import tableHeaders from './ticketTableHeaders';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>You have no ticket</div>
  </div>
);

const Tickets = ({ tickets, searchQuery, loading }) => {
  let searchedTickets = tickets.data;
  if (searchQuery && searchQuery.length > 0) {
    searchedTickets = tickets.data
      .filter((ticket) => ticket.address.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  return (
    <div style={{ background: 'white', marginLeft: -24, marginTop: 15 }}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        dataSource={searchedTickets}
        noDataMessage={NoDataMessage}
        loading={loading}
      />
    </div>
  );
};

export default Tickets;
