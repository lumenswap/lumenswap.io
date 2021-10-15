import CTable from 'components/CTable';
import { getRoundParticipants } from 'api/lottery';
import { useEffect, useState } from 'react';
import tableHeaders from './participantsTableHeaders';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>There are no participants</div>
  </div>
);

const Participants = ({ searchQuery, round }) => {
  const [searchedParticipants, setSearchedParticipants] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = { limit: 10 };
        if (searchQuery !== null && searchQuery !== '') {
          query.address = searchQuery;
        }

        const fetchedParticipants = await getRoundParticipants(
          round.number, query,
        );
        setSearchedParticipants(fetchedParticipants.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ background: 'white', marginLeft: -24, marginTop: 15 }}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        dataSource={searchedParticipants}
        noDataMessage={NoDataMessage}
        loading={searchedParticipants === null}
      />
    </div>
  );
};

export default Participants;
