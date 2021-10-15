import CTable from 'components/CTable';
import { getRoundParticipants } from 'api/lottery';
import { useEffect, useRef, useState } from 'react';
import tableHeaders from './participantsTableHeaders';
import styles from '../style.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>There are no participants</div>
  </div>
);

const Participants = ({ searchQuery, round }) => {
  const [searchedParticipants, setSearchedParticipants] = useState(null);

  const timeOutRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedParticipants = await getRoundParticipants(
          round.number, { searchAddress: searchQuery, limit: 10 },
        );
        setSearchedParticipants(fetchedParticipants.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = setTimeout(async () => {
        setSearchedParticipants(null);
        const fetchedParticipants = await getRoundParticipants(
          round.number, { searchAddress: searchQuery, limit: 10 },
        );
        setSearchedParticipants(fetchedParticipants.data);
      }, 700);
    }

    fetchData();
  }, [searchQuery]);

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
