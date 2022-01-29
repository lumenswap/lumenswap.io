import NoData from 'components/NoData';
import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (<NoData message="There is no votes" />);

function VotesData({ votes }) {
  const tableInfo = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: '1',
      render: (data) => (
        <a
          href={generateAddressURL(data.address)}
          className={styles.url}
          target="_blank"
          rel="noreferrer"
        >{minimizeAddress(data.address)}
        </a>
      ),
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      key: '2',
      render: (data) => `${data.vote}`,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: (data) => `${humanAmount(data.amount)} ${data.asset.code}`,
    },
  ];

  return (
    <CTable
      className={styles.table}
      columns={tableInfo}
      dataSource={votes}
      loading={!votes}
      noDataComponent={NoDataMessage}
      rowFix={{ rowNumbers: 10, rowHeight: 53, headerRowHeight: 25 }}
    />
  );
}

export default VotesData;
