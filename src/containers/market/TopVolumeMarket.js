import { useEffect, useState } from 'react';

import CTable from 'components/CTable';
import Loading from 'components/Loading';
import questionLogo from 'assets/images/question.png';
import defaultTokens from 'tokens/defaultTokens';
import { getTopVolume } from 'api/market';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles.noDataMessageContainer}>
    <div className={styles.noDataMessage}> There is no data to display</div>
  </div>
);

function TopVolumeMarket() {
  const [topVolumeList, setTopVolumeList] = useState(null);
  const [assets, setAssets] = useState(null);

  const hashedDefaultTokens = defaultTokens.reduce((acc, cur) => {
    acc[cur.code] = cur;
    return acc;
  }, {});

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
          logo: questionLogo,
        };
        const counter = {
          code: asset.counterAssetCode,
          issuer: asset.counterAssetIssuer,
          logo: questionLogo,
        };
        if (hashedDefaultTokens[asset.baseAssetCode]) {
          if (base.logo) base.logo = hashedDefaultTokens[asset.baseAssetCode].logo;
        }
        if (hashedDefaultTokens[asset.counterAssetCode]) {
          if (counter.logo) counter.logo = hashedDefaultTokens[asset.counterAssetCode].logo;
        }

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
      dataIndex: 'price',
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
      title: '24H Volume',
      dataIndex: 'volume24h',
      key: '4',
      render: (data) => `${data.volume24h}`,

    },
  ];

  if (!assets) {
    return <div className={styles['loading-container']}><Loading size={48} /></div>;
  }

  return (
    <>
      <div style={{ marginLeft: '-24px' }}>
        <CTable
          className={styles.table}
          columns={tableHeaders}
          noDataMessage={NoDataMessage}
          dataSource={topVolumeList}
        />
      </div>
    </>
  );
}

export default TopVolumeMarket;
