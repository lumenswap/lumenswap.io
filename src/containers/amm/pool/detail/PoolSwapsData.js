import CTable from 'components/CTable';
import moment from 'moment';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import { useEffect, useState } from 'react';
import { getPoolSwapsAPI } from 'api/stellarPool';
import getAssetDetails from 'helpers/getAssetDetails';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>There is no swaps</span>
  </div>
);

function PoolSwapsData({ poolId }) {
  const [poolSwaps, setPoolSwaps] = useState(null);

  useEffect(() => {
    async function loadData() {
      const swaps = await getPoolSwapsAPI(poolId, { order: 'desc', limit: 10 });
      setPoolSwaps(swaps);
    }

    loadData();
  }, []);

  const tableHeaders = [
    {
      title: 'TX',
      dataIndex: 'tx',
      key: 1,
      render: (data) => {
        const isSell = data.base_is_seller;

        const tokenA = getAssetDetails({
          code: data.base_asset_code,
          issuer: data.base_asset_issuer,
        });

        const tokenB = getAssetDetails({
          code: data.counter_asset_code,
          issuer: data.counter_asset_issuer,
        });

        let base;
        let counter;
        if (isSell) {
          base = {
            token: tokenA,
            amount: data.base_amount,
          };
          counter = {
            token: tokenB,
            amount: data.counter_amount,
          };
        } else {
          base = {
            token: tokenB,
            amount: data.counter_amount,
          };
          counter = {
            token: tokenA,
            amount: data.base_amount,
          };
        }

        return (
          <span>Swap {humanAmount(base.amount)}{' '}
            {base.token.getCode()} for {humanAmount(counter.amount)}{' '}
            {counter.token.getCode()}
          </span>
        );
      },
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 2,
      render: (data) => {
        const address = data.base_account || data.counter_account;

        return (
          <a
            className={styles['tx-link']}
            href={generateAddressURL(address)}
            target="_blank"
            rel="noreferrer"
          >
            {minimizeAddress(address)}
          </a>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 3,
      render: (data) => <span>{moment(data.ledger_close_time).fromNow()}</span>,
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
