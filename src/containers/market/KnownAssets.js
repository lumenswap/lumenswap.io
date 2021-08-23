import { useEffect, useState } from 'react';

import CTable from 'components/CTable';
import Loading from 'components/Loading';
import questionLogo from 'assets/images/question.png';
import defaultTokens from 'tokens/defaultTokens';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}> There is no data to display</div>
  </div>
);

function KnownAssets({ assets }) {
  const [knownAssets, setKnownAssets] = useState(null);

  const hashedDefaultTokens = defaultTokens.reduce((acc, cur) => {
    acc[cur.code] = cur;
    return acc;
  }, {});

  useEffect(() => {
    const pairedAssets = assets.data.map((asset) => {
      const base = {
        code: asset.baseAssetCode,
        issuer: asset.baseAssetIssuer,
        logo: questionLogo.src,
      };
      const counter = {
        code: asset.counterAssetCode,
        issuer: asset.counterAssetIssuer,
        logo: questionLogo.src,
      };
      if (hashedDefaultTokens[asset.baseAssetCode]) {
        base.logo = hashedDefaultTokens[asset.baseAssetCode].logo;
      }
      if (hashedDefaultTokens[asset.counterAssetCode]) {
        counter.logo = hashedDefaultTokens[asset.counterAssetCode].logo;
      }

      return {
        id: asset.id,
        pair: {
          base,
          counter,
        },
        lastPrice: asset.lastPrice,
        change24h: Number(asset.change24h).toFixed(2),
        high24h: Number(asset.high24h).toFixed(2),
        low24h: Number(asset.low24h).toFixed(2),
        volume24h: Number(asset.volume24h).toFixed(2),
      };
    });

    setKnownAssets(pairedAssets);
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
      render: (data) => `${data.lastPrice}`,
    },
    {
      title: '24 change',
      dataIndex: 'change24h',
      key: '3',
      render: (data) => `${data.change24h}`,
    },
    {
      title: '24 High',
      dataIndex: 'high24h',
      key: '4',
      render: (data) => `${data.high24h}`,
    },
    {
      title: '24 Low',
      dataIndex: 'low24h',
      key: '5',
      render: (data) => `${data.low24h}`,
    },
    {
      title: '24H Volume',
      dataIndex: 'volume24h',
      key: '6',
      render: (data) => `${data.volume24h}`,

    },
  ];

  if (!knownAssets) {
    return <div className={styles['loading-container']}><Loading size={48} /></div>;
  }

  return (
    <>
      <div style={{ marginLeft: '-24px' }}>
        <CTable
          className={styles.table}
          columns={tableHeaders}
          dataSource={knownAssets}
          noDataMessage={NoDataMessage}
        />
      </div>
    </>
  );
}

export default KnownAssets;
