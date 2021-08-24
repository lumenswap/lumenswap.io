import CTabs from 'components/CTabs';
import Input from 'components/Input';
import { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import MarketTabContent from './MarketTabContent';

function MarketData({ assets }) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  const SearchInput = useCallback(() => (
    <div className={styles.input}>
      <Input
        type="text"
        name="asset"
        id="asset"
        placeholder="Search assets"
        onChange={handleSearch}
        height={40}
        fontSize={15}
      />
    </div>
  ), []);

  const tabs = [
    { title: 'Known assets', id: 'assets' },
    { title: 'Top Volume Market', id: 'topvolume' },
  ];
  return (
    <>
      <div className={styles['table-container']}>
        <div className={styles.header}>
          <div className={styles.ctab}>
            <CTabs
              tabs={tabs}
              tabContent={MarketTabContent}
              customTabProps={{ assets, searchQuery }}
              extraComponent={SearchInput}
              className={`${styles.tabs}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketData;
