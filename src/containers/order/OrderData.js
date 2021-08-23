import CTabs from 'components/CTabs';
import styles from './styles.module.scss';
import OrderTabContent from './OrderTabContent';

function OrderData({ setShowCancel }) {
  const tabs = [
    { title: 'Open Order', id: 'order' },
    { title: 'Trade History', id: 'trade' },
  ];

  return (
    <>
      <div className={styles['table-container']}>
        <div className={styles.header}>
          <div className={styles.ctab}>
            <CTabs
              tabs={tabs}
              tabContent={OrderTabContent}
              onChange={(tab) => {
                if (tab === 'trade') {
                  setShowCancel(false);
                } else {
                  setShowCancel(true);
                }
              }}
              className={styles.tabs}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderData;
