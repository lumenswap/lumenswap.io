import CTable from 'components/CTable';
import Loading from 'components/Loading';
import tableHeaders from './participantsTableHeaders';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>You have no ticket</div>
  </div>
);

const Participants = ({ participants, searchQuery, loading }) => (
  <div style={{ background: 'white', marginLeft: -24, marginTop: 15 }}>
    <CTable
      className={styles.table}
      columns={tableHeaders}
      dataSource={participants}
      noDataMessage={NoDataMessage}
      loading={loading}
    />
  </div>
);

export default Participants;
