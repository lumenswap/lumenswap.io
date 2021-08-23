import CTabs from 'components/CTabs';
import styles from './styles.module.scss';
import MarketTabContent from './MarketTabContent';

function MarketData({ assets }) {
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
              customTabProps={{ assets }}
              className={styles.tabs}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketData;
