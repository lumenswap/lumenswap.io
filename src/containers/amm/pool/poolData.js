import CurrencyPair from 'components/CurrencyPair';
import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import { useEffect, useState } from 'react';
import { extractLogo } from 'helpers/assetUtils';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import humanAmount from 'helpers/humanAmount';
import Input from 'components/Input';
import { getKnownPools } from 'api/amm';
import BN from 'helpers/BN';
import styles from './styles.module.scss';

function NoDataMessage() {
  return (
    <div className={styles['empty-table-container']}>
      <span>There is no pool</span>
    </div>
  );
}

function PoolData() {
  const [knownPools, setKnownPools] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  const renderPoolInfo = (data) => {
    const assetA = getAssetFromLPAsset(data.reserves[0].asset);
    const assetB = getAssetFromLPAsset(data.reserves[1].asset);

    return (
      <div className={styles.pairs}>
        <CurrencyPair
          size={22}
          source={[extractLogo(assetA), extractLogo(assetB)]}
        />
        <span>{`${assetA.code}/${assetB.code}`}</span>
      </div>
    );
  };

  useEffect(() => {
    getKnownPools().then((allPools) => {
      setKnownPools(allPools.map((pool) => ({
        ...pool,
        key: pool.poolId,
      }))
        .sort((a, b) => new BN(b.tvl).comparedTo(a.tvl)));
    });
  }, []);

  const tableHeader = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: '1',
      render: renderPoolInfo,
    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      key: '2',
      sortFunc: (a, b, order) => (order === 'asc' ? a.tvl - b.tvl : b.tvl - a.tvl),
      render: (data) => (
        <span className={styles.balance}>
          ${humanAmount(data.tvl, true)}
        </span>
      ),
    },
    {
      title: 'Volume 24h',
      dataIndex: 'volume',
      key: 3,
      sortFunc: (a, b) => a - b,
      render: (data) => (
        <span>
          ${humanAmount(new BN(data.volume_24h).div(10 ** 7).toString(), true)}
        </span>
      ),
    },
    {
      title: 'APR',
      dataIndex: 'apr',
      key: 3,
      render: (data) => (
        <span>
          %{new BN(data.volume_24h)
          .div(10 ** 7)
          .times(0.3)
          .times(365)
          .div(data.tvl)
          .toFixed(2)}
        </span>
      ),
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: '4',
    //   render: renderModals,
    // },
  ];

  let filteredPools = knownPools ? [...knownPools] : [];
  if (searchQuery) {
    filteredPools = filteredPools?.filter(
      (pool) => pool.pair.base.code
        .toLowerCase()
        .search(searchQuery.toLocaleLowerCase()) !== -1
        || pool.pair.counter.code
          .toLowerCase()
          .search(searchQuery.toLocaleLowerCase()) !== -1,
    ).map((item) => ({
      ...item,
    }));
  }

  const rowLink = (data) => urlMaker.pool.poolId(data.poolId);

  return (
    <div className={styles['table-container']}>
      {knownPools
      && (
        <div className={styles['search-box']}>
          <div className={styles.input}>
            <Input
              type="text"
              name="asset"
              id="asset"
              placeholder="Enter pair"
              onChange={handleSearch}
              height={40}
              fontSize={15}
            />
          </div>
        </div>
      )}
      <CTable
        columns={tableHeader}
        dataSource={filteredPools}
        noDataMessage={NoDataMessage}
        className={styles.table}
        rowLink={rowLink}
        loading={knownPools === null}
      />
    </div>
  );
}

export default PoolData;
