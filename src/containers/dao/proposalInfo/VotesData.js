import NoData from 'components/NoData';
import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (<NoData message="There is no votes" />);

function VotesData({ votes }) {
  const votesTableHeaders = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: '1',
      render: (voteDetails) => (
        <a
          href={generateAddressURL(voteDetails.address)}
          className={styles.url}
          target="_blank"
          rel="noreferrer"
        >{minimizeAddress(voteDetails.address)}
        </a>
      ),
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      key: '2',
      render: (voteDetails) => `${voteDetails.vote}`,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: (voteDetails) => `${humanAmount(voteDetails.amount)} ${voteDetails.asset.code}`,
    },
  ];

  return (
    <CTable
      className={styles.table}
      columns={votesTableHeaders}
      dataSource={votes}
      loading={!votes}
      noDataComponent={NoDataMessage}
      rowFix={{ rowNumbers: 10, rowHeight: 53, headerRowHeight: 25 }}
    />
  );
}

export default VotesData;
