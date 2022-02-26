import CTable from 'components/CTable';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import humanizeAmount from 'helpers/humanizeAmount';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

function DAOSingleProposalVotes({ votes, asset }) {
  const votesTableHeaders = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: '1',
      render: (voteDetails) => (
        <a
          href={generateAddressURL(voteDetails.voter)}
          className={styles.url}
          target="_blank"
          rel="noreferrer"
        >{minimizeAddress(voteDetails.voter)}
        </a>
      ),
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      key: '2',
      render: (voteDetails) => (
        <span style={{ width: 250 }} className="truncate">
          {voteDetails.voteText}
        </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: (voteDetails) => `${humanizeAmount(new BN(voteDetails.amount).div(10 ** 7).toFixed(7))} ${asset.code}`,
    },
  ];

  return (
    <CTable
      className={styles.table}
      columns={votesTableHeaders}
      dataSource={votes}
      loading={!votes}
      noDataMessage="There is no votes"
      rowFix={{ rowNumbers: 10, rowHeight: 53, headerRowHeight: 25 }}
    />
  );
}

export default DAOSingleProposalVotes;
