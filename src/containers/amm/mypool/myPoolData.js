import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import CurrencyPair from 'components/CurrencyPair';
import { getAssetFromLPAsset, extractLogoByToken } from 'helpers/asset';
import humanizeAmount from 'helpers/humanizeAmount';
import useDefaultTokens from 'hooks/useDefaultTokens';
import styles from './styles.module.scss';

function MyPoolData({ pools }) {
  const renderAssetInfo = (data) => {
    const token1 = getAssetFromLPAsset(data.reserves[0].asset);
    const token2 = getAssetFromLPAsset(data.reserves[1].asset);
    const defaultTokens = useDefaultTokens();

    return (
    // <Link href={urlMaker.amm.pool.poolId(data.id)}>
    //   <a style={{ textDecoration: 'none', color: '#1d1d1d' }}>
      <div className={styles.tokens}>
        <CurrencyPair
          size={22}
          source={[extractLogoByToken(token1, defaultTokens),
            extractLogoByToken(token2, defaultTokens)]}
        />
        <span>
          {token1.code}/{token2.code}
        </span>
      </div>
    //   </a>
    // </Link>
    );
  };

  const tableHeaders = [
    {
      title: 'Asset',
      dataIndex: 'asset',
      key: 1,
      render: renderAssetInfo,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 2,
      render: (data) => (
        <span>
          {humanizeAmount(data.calculateUserBalance(data.reserves[0].amount), true)} {getAssetFromLPAsset(data.reserves[0].asset).code}{' / '}
          {humanizeAmount(data.calculateUserBalance(data.reserves[1].amount), true)}{' '}
          {getAssetFromLPAsset(data.reserves[1].asset).code}
        </span>
      ),
    },
    {
      title: 'Balance (USD)',
      dataIndex: 'balanceUSD',
      key: 3,
      sortFunc: (a, b, order) => (order === 'asc' ? a.balanceUSD - b.balanceUSD : b.balanceUSD - a.balanceUSD),
      render: (data) => (
        <span>
          {data.balanceUSD !== '-' && '$'}{humanizeAmount(data.balanceUSD, true)}
        </span>
      ),
    },
  ];

  const rowURLGenerator = (data) => urlMaker.amm.myPool.detail(data.id);

  return (
    <div className={styles['table-container']}>
      <CTable
        className={styles.table}
        dataSource={pools}
        columns={tableHeaders}
        noDataMessage="You have no pool"
        loading={pools === null}
        rowLink={rowURLGenerator}
      />
    </div>
  );
}

export default MyPoolData;
