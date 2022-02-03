import { useEffect, useState } from 'react';
import numeral from 'numeral';
import BN from 'helpers/BN';
import CTable from 'components/CTable';
import Loading from 'components/Loading';
import urlMaker from 'helpers/urlMaker';
import { extractInfoByToken } from 'helpers/asset';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

function KnownAssets({ assets, searchQuery }) {
  const [knownAssets, setKnownAssets] = useState(null);
  const [filteredAssets, setFilteredAssets] = useState(null);

  useEffect(() => {
    const pairedAssets = assets?.data.map((asset) => {
      const base = {
        code: asset.baseAssetCode,
        issuer: asset.baseAssetIssuer,
        logo: extractInfoByToken({ code: asset.baseAssetCode, issuer: asset.baseAssetIssuer }).logo,
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
        id: asset.id,
        pair: {
          base,
          counter,
        },
        lastPrice: asset.lastPrice,
        change24h: Number(asset.change24h).toFixed(2),
        high24h: humanAmount(asset.high24h),
        low24h: humanAmount(asset.low24h),
        volume24h: asset.volume24h,
      };
    });

    const sortedAssets = pairedAssets.sort((a, b) => new BN(b.volume24h).comparedTo(a.volume24h));

    setKnownAssets(sortedAssets);
  }, [assets]);

  const tableHeaders = [
    {
      title: 'Pair',
      dataIndex: 'pair',
      key: '1',
      render: (data) => (
        <div className={styles.pair}>
          <img src={data.pair.base.logo} alt="baselogo" />
          <img src={data.pair.counter.logo} alt="counterlogo" />
          <span>
            {data.pair.base.code}/{data.pair.counter.code}
          </span>
        </div>
      ),
    },
    {
      title: 'Last Price',
      dataIndex: 'lastPrice',
      key: '2',
      sortFunc: (a, b, order) => (order === 'asc' ? a.lastPrice - b.lastPrice : b.lastPrice - a.lastPrice),
      render: (data) => `${humanAmount(data.lastPrice)}  ${data.pair.counter.code}`,
    },
    {
      title: '24 change',
      dataIndex: 'change24h',
      key: '3',
      sortFunc: (a, b, order) => (order === 'desc' ? a.change24h - b.change24h : b.change24h - a.change24h),
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
      title: '24 High',
      dataIndex: 'high24h',
      key: '4',
      sortFunc: (a, b, order) => (order === 'asc' ? a.high24h - b.high24h : b.high24h - a.high24h),
      render: (data) => `${data.high24h} ${data.pair.counter.code}`,
    },
    {
      title: '24 Low',
      dataIndex: 'low24h',
      key: '5',
      sortFunc: (a, b, order) => (order === 'asc' ? a.low24h - b.low24h : b.low24h - a.low24h),
      render: (data) => `${data.low24h} ${data.pair.counter.code}`,
    },
    {
      title: '24H Volume',
      dataIndex: 'volume24h',
      key: '6',
      sortFunc: (a, b, order) => (order === 'asc' ? a.volume24h - b.volume24h : b.volume24h - a.volume24h),
      render: (data) => `${numeral(data.volume24h).format('0.[0]a')} ${data.pair.counter.code}`,
    },
  ];

  useEffect(() => {
    if (searchQuery !== '' && knownAssets) {
      const filtered = knownAssets.filter(
        (asset) => {
          let value = `${asset.pair.base.code}/${asset.pair.counter.code}`;
          value = value.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
          return value;
        },
      );

      setFilteredAssets(filtered);
    } else {
      setFilteredAssets(knownAssets);
    }
  }, [searchQuery, knownAssets]);

  if (!knownAssets) {
    return (
      <div className={styles['loading-container']}>
        <Loading size={48} />
      </div>
    );
  }

  const rowLink = (data) => urlMaker.obm.spot.custom(
    data.pair.base.code,
    null,
    data.pair.counter.code,
    null,
  );
  return (
    <div style={{ marginLeft: '-24px' }}>
      <CTable
        className={styles.table}
        columns={tableHeaders}
        dataSource={filteredAssets}
        noDataMessage="There is no asset"
        rowLink={rowLink}
      />
    </div>
  );
}

export default KnownAssets;
