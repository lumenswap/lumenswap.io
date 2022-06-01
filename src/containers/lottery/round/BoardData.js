import CTabs from 'components/CTabs';
import Input from 'components/Input';
import { useCallback, useRef, useState } from 'react';
import jsxThemeColors from 'helpers/jsxThemeColors';
import styles from './style.module.scss';
import BoardTabContent from './BoardTabContent';

function BoardData({ round, onTabChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputPlaceHolder, setInputPlaceHolder] = useState('Enter your ticket Id');
  const timeoutRef = useRef(null);

  const handleSearch = (e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
    }, 700);
  };

  const handleTabChange = (tab) => {
    setSearchQuery(null);
    onTabChange(tab);
    if (tab === 'tickets') {
      setInputPlaceHolder('Enter your ticket Id');
    } else {
      setInputPlaceHolder('Enter your address');
    }
  };

  const SearchInput = useCallback(() => (
    <div className={styles.input}>
      <Input
        type="text"
        placeholder={inputPlaceHolder}
        onChange={handleSearch}
        height={40}
        fontSize={14}
        className={styles.input}
      />
    </div>
  ), [inputPlaceHolder]);

  const tabs = [
    { title: 'Tickets', id: 'tickets' },
    { title: 'Participants', id: 'participants' },
  ];

  return (
    <>
      <div style={{ boxShadow: jsxThemeColors.boxShadow }} className={styles['table-container']}>
        <div className={styles.header}>
          <div className={styles.ctab}>
            <CTabs
              tabs={tabs}
              tabContent={BoardTabContent}
              onChange={handleTabChange}
              customTabProps={{
                searchQuery, round,
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
