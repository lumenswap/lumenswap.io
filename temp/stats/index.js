import Head from 'next/head';
import classNames from 'classnames';
import fetchStats from 'helpers/statsApi';
import ObmHeader from 'components/ObmHeader';
import CurrencyPair from 'components/CurrencyPair';
import numeral from 'numeral';
import CTable from 'components/CTable';
import Input from 'components/Input';
import TVLChart from 'components/TVLChart';
import VolumeChart from 'components/VolumeChart';
import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import getAssetDetails from 'helpers/getAssetDetails';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import urlMaker from 'helpers/urlMaker';
import styles from './styles.module.scss';

function NoDataMessage() {
  return <div className={styles['no-data-message-container']}><span>There is no pools</span></div>;
}

const Stats = () => {
  const [userStats, setUserStats] = useState(null);
  const userAdress = useSelector((state) => state.user.detail.address);
  const tableHeaders = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: '1',
      render: (data) => {
        const asset1 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token1));
        const asset2 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token2));
        return (
          <div className="d-flex">
            <CurrencyPair size={20} source={[asset1.logo, asset2.logo]} />
            <span className={styles.pair}>{data.token1.code}/{data.token2.code}</span>
          </div>
        );
      },

    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      key: '2',
      sortFunc: () => {},
      render: (data) => <span>${numeral(data.balance).format('0,0')}</span>,
    },
    {
      title: 'Volume 24h',
      dataIndex: 'volume24',
      key: '3',
      sortFunc: () => {},
      render: (data) => data.volumePerDay,
    },
    {
      title: 'Volume 7d',
      dataIndex: 'volume7',
      key: '4',
      sortFunc: () => {},
      render: (data) => data.volumePerWeek,
    },
  ];

  const rowLink = (data) => urlMaker.amm.stats.tokens(data.token1.code, data.token2.code);

  useEffect(() => {
    fetchStats(userAdress).then((data) => {
      setUserStats(data.map((item) => ({
        ...item,
        key: item.token1.code,
      })));
    });
  }, []);

  return (
    <div className="container-fluid pb-5">
      <Head>
        <title>Stats | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-11 col-md-12 col-sm-12 col-12">
            <h1 className={classNames(styles.label, styles['label-bold'])}>
              Stats
            </h1>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={classNames(styles.card, styles['card-chart'])}>
                  <TVLChart style={{ marginTop: '-4px' }} />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className={classNames(styles.card, styles['card-chart'])}>
                  <VolumeChart />
                </div>
              </div>
            </div>
            <h2 className={styles.label}>
              Pools
            </h2>
            <div className={classNames(styles.card, styles['card-table'])}>
              <div className="row justify-content-end">
                <div className="col-xl-5 col-lg-6 col-md-7 col-sm-12 col-12">
                  <form className={styles.form}>
                    <Input
                      type="text"
                      placeholder="Search assets"
                      height={32}
                      fontSize={14}
                    />
                  </form>
                </div>
              </div>
              <CTable
                className={styles.table}
                columns={tableHeaders}
                dataSource={userStats}
                rowLink={rowLink}
                noDataMessage={NoDataMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
