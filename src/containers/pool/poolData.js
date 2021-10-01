import defaultTokens from 'tokens/defaultTokens';
import isSameAsset from 'helpers/isSameAsset';
import CurrencyPair from 'components/CurrencyPair';
import getAssetDetails from 'helpers/getAssetDetails';
import numeral from 'numeral';
import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import styles from './styles.module.scss';

function NoDataMessage() {
  return <div className={styles['empty-table-container']}><span>You have no pool</span></div>;
}

function PoolData({ userPools }) {
  const tableHeader = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: '1',
      render: (data) => {
        const asset1 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token1));
        const asset2 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token2));
        return (
          <div className={styles.pairs}>
            <CurrencyPair size={22} source={[asset1.logo, asset2.logo]} />
            <span>{`${asset1.code}/${asset2.code}`}</span>
          </div>
        );
      }
      ,
    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      key: '2',
      render: (data) => <span className={styles.balance}>${numeral(data.balance).format('0,0')}</span>,
    },
  ];
  const rowLink = (data) => urlMaker.pool.tokens(data.token1.code, data.token2.code);

  return (
    <div className={styles['table-container']}>
      <CTable
        columns={tableHeader}
        dataSource={userPools}
        noDataMessage={NoDataMessage}
        className={styles.table}
        rowLink={rowLink}
      />
    </div>
  );
}

export default PoolData;
