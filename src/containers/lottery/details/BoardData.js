import CTabs from 'components/CTabs';
import Input from 'components/Input';
import { useCallback, useState } from 'react';
import styles from './style.module.scss';
import BoardTabContent from './BoardTabContent';

function BoardData({ tickets, loading, participants }) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  const SearchInput = useCallback(() => (
    <div className={styles.input}>
      <Input
        type="text"
        name="address"
        id="address"
        placeholder="Enter your address"
        onChange={handleSearch}
        height={32}
        fontSize={14}
        className={styles.input}
      />
    </div>
  ), []);

  const tabs = [
    { title: 'Tickets', id: 'tickets' },
    { title: 'Participants', id: 'participants' },
  ];

  return (
    <>
      <div className={styles['table-container']}>
        <div className={styles.header}>
          <div className={styles.ctab}>
            <CTabs
              tabs={tabs}
              tabContent={BoardTabContent}
              customTabProps={{
                tickets, searchQuery, loading, participants,
              }}
              extraComponent={SearchInput}
              className={`${styles.tabs}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardData;
