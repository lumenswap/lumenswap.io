import CTable from 'components/CTable';
import moment from 'moment';
import { generateOperationIdURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>There is no swaps</span>
  </div>
);

function PoolSwapsData({ poolSwaps }) {
  const tableHeaders = [
    {
      title: 'TX',
      dataIndex: 'tx',
      key: 1,
      render: (swap) => (
        <span>Swap {swap.swapInfo[0].length}{' '}
          {swap.swapInfo[0].code} per {swap.swapInfo[1].length}{' '}
          {swap.swapInfo[1].code}
        </span>
      ),
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 2,
      render: (data) => (
        <a
          className={styles['tx-link']}
          href={generateOperationIdURL(data.account)}
          target="_blank"
          rel="noreferrer"
        >
          {minimizeAddress(data.account)}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 3,
      render: (data) => <span>{moment(data.date).fromNow()}</span>,
    },
  ];

  return (
    <CTable
      columns={tableHeaders}
      noDataMessage={NoDataMessage}
      dataSource={poolSwaps}
      className={styles.table}
      loading={poolSwaps === null}
    />
  );
}

export default PoolSwapsData;
