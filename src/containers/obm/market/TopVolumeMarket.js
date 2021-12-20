import { useEffect, useState } from 'react';
import numeral from 'numeral';
import CTable from 'components/CTable';
import Loading from 'components/Loading';
import { extractInfoByToken, getAssetDetails } from 'helpers/asset';
import { getTopVolume } from 'api/market';
import BN from 'helpers/BN';
import urlMaker from 'helpers/urlMaker';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}>There is no asset</div>
  </div>
);

function TopVolumeMarket({ searchQuery }) {
  const [topVolumeList, setTopVolumeList] = useState(null);
  const [assets, setAssets] = useState(null);
  const [filteredAssets, setFilteredAssets] = useState(null);

  useEffect(() => {
    async function loadData() {
      const result = await getTopVolume();
      setAssets(result.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (assets) {
      const pairedAssets = assets.map((asset) => {
        const base = {
          code: asset.baseAssetCode,
          issuer: asset.baseAssetIssuer,
          logo: extractInfoByToken({
            code: asset.baseAssetCode,
            issuer: asset.baseAssetIssuer,
          }).logo,
        };
        const counter = {
          code: asset.counterAssetCode,
          issuer: asset.counterAssetIssuer,
          logo: extractInfoByToken({
            code: asset.counterAssetCode,
            issuer: asset.counterAssetIssuer,
          }).logo,
        };

        return {
          pair: {
            base,
            counter,
          },
          lastPrice: asset.price,
          change24h: Number(asset.change24h).toFixed(2),
          volume24h: Number(asset.volume).toFixed(2),
        };
      });

      setTopVolumeList(pairedAssets);
    }
  }, [assets]);

  useEffect(() => {
    if (searchQuery !== '' && topVolumeList) {
      const filtered = topVolumeList.filter(
        (asset) => {
          let value = `${asset.pair.counter.code}/${asset.pair.base.code}`;
          value = value.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
          return value;
        },
      );

      setFilteredAssets(filtered);
    } else {
      setFilteredAssets(topVolumeList);
    }
  }, [searchQuery, topVolumeList]);

  const tableHeaders = [
    {
      title: 'Pair',
      dataIndex: 'pair',
      key: '1',
      render: (data) => (
        <div className={styles.pair}>
          <img src={data.pair.counter.logo} alt="counterlogo" />
          <img src={data.pair.base.logo} alt="baseLogo" />
          <span>
            {data.pair.counter.code}/{data.pair.base.code}
          </span>
        </div>
      ),
    },
    {
      title: 'Last Price',
      dataIndex: 'lastPrice',
      key: '2',
      sortFunc: (a, b, order) => (order === 'desc'
        ? a.lastPrice - b.lastPrice
        : b.lastPrice - a.lastPrice),
      render: (data) => `${humanAmount(data.lastPrice)} ${data.pair.base.code}`,
    },
    {
      title: '24 change',
      dataIndex: 'change24h',
      key: '3',
      sortFunc: (a, b, order) => (order === 'desc'
        ? a.change24h - b.change24h
        : b.change24h - a.change24h),
      render: (data) => (
        <span
          className={
            new BN(data.change24h).isNegative()
              ? styles.change_negative
              : styles.change_positive
          }
        >
          {data.change24h}%
        </span>
      ),
    },
    {
      title: '24H Volume',
      dataIndex: 'volume24h',
      key: '4',
      sortFunc: (a, b, order) => (order === 'desc'
        ? a.volume24h - b.volume24h
        : b.volume24h - a.volume24h),
      render: (data) => `${numeral(data.volume24h).format('0.[0]a')} ${data.pair.base.code}`,
    },
  ];

  if (!assets) {
    return (
      <div className={styles['loading-container']}>
        <Loading size={48} />
      </div>
    );
  }

  const rowLink = (data) => {
    const assetA = getAssetDetails(data.pair.base);
    const assetB = getAssetDetails(data.pair.counter);

    return urlMaker.obm.spot.custom(
      assetB.code,
      assetB.issuer,
      assetA.code,
      assetA.issuer,
    );
  };

  return (
    <div style={{ marginLeft: '-24px' }}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        noDataComponent={NoDataMessage}
        dataSource={filteredAssets}
        rowLink={rowLink}
      />
    </div>
  );
}

export default TopVolumeMarket;
