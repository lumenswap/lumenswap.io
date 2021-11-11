import CTable from 'components/CTable';
import moment from 'moment';
import { generateOperationIdURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>There is no activity</span>
  </div>
);

function PoolsActivityData({ poolOperations }) {
  const tableHeaders = [
    {
      title: 'Operation ID',
      dataIndex: 'operationId',
      key: 1,
      render: (operation) => (
        <a
          className={styles['tx-link']}
          href={generateOperationIdURL(operation.id)}
          target="_blank"
          rel="noreferrer"
        >
          {minimizeAddress(operation.id)}
        </a>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 2,
      render: (operation) => {
        let type = 'Unknown';

        if (operation.type === 'change_trust') {
          if (new BN(operation.limit).isEqualTo(0)) {
            type = 'Remove Trustline';
          } else {
            type = 'Add Trustline';
          }
        }

        if (operation.type === 'liquidity_pool_deposit') {
          type = 'Deposit';
        }

        if (operation.type === 'liquidity_pool_withdraw') {
          type = 'Withdraw';
        }

        if (operation.type === 'path_payment_strict_receive' || operation.type === 'path_payment_strict_send') {
          type = 'Swap';
        }

        return (
          <div className={styles['table-info-row']}>
            <span>{type}</span>
          </div>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'time',
      key: 3,
      render: (operation) => <span>{moment(operation.created_at).fromNow()}</span>,
    },
  ];

  return (
    <CTable
      columns={tableHeaders}
      noDataMessage={NoDataMessage}
      dataSource={poolOperations}
      className={styles.table}
      loading={poolOperations === null}
    />
  );
}

export default PoolsActivityData;
