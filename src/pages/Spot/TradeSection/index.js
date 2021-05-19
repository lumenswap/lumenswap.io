import CustomTabs from 'components/CustomTabs';
import SpotList from 'components/SpotList';
import styles from '../styles.module.scss';

const tradeListHeader = ['Price (USDC)', 'Amount (XLM)', 'Time'];

const TradeSection = ({ tradeListData }) => {
  const tabData = [
    {
      title: 'Market Trades',
      id: 'one',
    },
    // { title: 'My Trades', id: 'two', content: 'You have no trades' },
  ];

  const TabContent = () => (
    <div className={styles['trade-container']}>
      <SpotList type="trade" headerItem={tradeListHeader} items={tradeListData} />
    </div>
  );

  return (
    <>
      <CustomTabs
        tabs={tabData}
        activeTabId={tabData[0].id}
        fontSize={14}
        tabContent={TabContent}
      />
    </>
  );
};

export default TradeSection;
