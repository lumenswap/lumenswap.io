import CustomTabs from 'components/CustomTabs';
import Table from 'components/Table';

import styles from '../styles.module.scss';

const BidsSection = () => {
  const tableHeader = ['Account', 'Date', 'Amount', 'Price', 'Total'];
  const tableRows = (rows) => rows.map((row) => (
    <tr key={row}>
      <td width="22%"><a href="/" target="_blank" rel="noreferrer">2jd0n8le…w98ue4ed</a></td>
      <td>1 min ago</td>
      <td>120 LSP</td>
      <td>1.5 XLM</td>
      <td>300 XLM</td>
    </tr>
  ));
  const historyTab = [
    {
      title: 'Latest bids',
      id: 'latest',
      content: <Table
        className={styles.table}
        tableRows={tableRows(new Array(10).fill(0))}
        tableHead={tableHeader}
      />,
    },
    {
      title: 'My bids (3)',
      id: 'mine',
      content: <Table
        className={styles.table}
        tableRows={tableRows(new Array(3).fill(0))}
        tableHead={tableHeader}
      />,
    },
  ];
  return (
    <div>
      <CustomTabs tabs={historyTab} activeTabId={historyTab[0].id} fontSize={16} />
    </div>
  );
};

export default BidsSection;
