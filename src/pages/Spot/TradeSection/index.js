import CustomTabs from 'components/CustomTabs';
import SpotList from 'components/SpotList';
import styles from '../styles.module.scss';

const tradeListHeader = ['Price (USDC)', 'Amounr(XLM)', 'Time'];
const tradeListItems = Array(37).fill({
  data: ['0.001238', '92', '15:38:16'],
  status: 'buy',
});

const tabData = [
  {
    title: 'Market Trades',
    id: 'one',
    content: <div className={styles['trade-container']}><SpotList type="trade" headerItem={tradeListHeader} items={tradeListItems} /></div>,
  },
  { title: 'My Trades', id: 'two', content: 'You have no trades' },
];

const TradeSection = () => (
  <>
    <CustomTabs tabs={tabData} activeTabId={tabData[0].id} fontSize={14} />
  </>
);

export default TradeSection;
