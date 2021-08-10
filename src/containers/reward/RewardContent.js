import CTable from 'components/CTable';
import CStatistics, { Info } from 'components/CStatistics';
import moment from 'moment';
import numeral from 'numeral';
import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import styles from './styles.module.scss';

const RewardContent = ({ rewardStats }) => {
  const tableHeaders = [
    {
      title: 'Tx',
      dataIndex: 'tx',
      key: '1',
      render: (data) => (
        <a
          href={generateTransactionURL(data.tx)}
          target="_blank"
          rel="noreferrer"
        >{minimizeAddress(data.tx)}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '2',
      render: (data) => <span>{moment(data.date).fromNow()}</span>,
    },
    { title: 'Type', dataIndex: 'type', key: '3' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '4',
      render: (data) => <span>{numeral(data.amount).format('0,0.[0000]')}</span>,
    },
  ];
  let statisticBlocks = null;
  if (rewardStats !== null) {
    statisticBlocks = [
      {
        title: 'Wallet balance',
        tooltip: 'tooltip ',
        content: <Info text="LSP" number={rewardStats.stats.walletBalance} />,
      },
      {
        title: 'Holder reward earned',
        tooltip: 'tooltip ',
        content: <Info text="LSP" number={rewardStats.stats.holderReward} />,
      },
      {
        title: 'Trade reward earned',
        tooltip: 'tooltip ',
        content: <Info text="LSP" number={rewardStats.stats.tradeReward} />,
      },
    ];
  }

  return (
    <div>
      <div className={styles['info-LSP']}>
        <CStatistics blocks={statisticBlocks} />
      </div>
      <div className={styles['table-title']}>Last activity</div>
      <CTable columns={tableHeaders} dataSource={rewardStats.lastActivity} />
    </div>
  );
};

export default RewardContent;
