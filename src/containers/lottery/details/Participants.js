import CTable from 'components/CTable';
import tableHeaders from './participantsTableHeaders';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>You have no ticket</div>
  </div>
);

const Participants = ({ participants, searchQuery, loading }) => {
  let searchedParticipants = participants;
  if (searchQuery && searchQuery.length > 0) {
    searchedParticipants = participants
      .filter((participant) => participant.address.toLowerCase()
        .includes(searchQuery.toLowerCase()));
  }

  return (
    <div style={{ background: 'white', marginLeft: -24, marginTop: 15 }}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        dataSource={searchedParticipants}
        noDataMessage={NoDataMessage}
        loading={loading}
      />
    </div>
  );
};

export default Participants;
