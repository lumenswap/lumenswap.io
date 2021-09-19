import Head from 'next/head';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import ObmHeader from 'components/ObmHeader';
import CurrencyPair from 'components/CurrencyPair';
import btcLogo from 'assets/images/btc-logo.png';
import usdLogo from 'assets/images/usd-coin-usdc.png';
import CTable from 'components/CTable';
import Input from 'components/Input';

import styles from './styles.module.scss';

const LiquidityChart = dynamic(() => import('../../components/LiquidityChart'), {
  ssr: false,
});

const VolumeChart = dynamic(() => import('../../components/VolumeChart'), {
  ssr: false,
});

const Stats = () => {
  const tableHeaders = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: '1',
      render: (data) => (
        <div className="d-flex">
          <CurrencyPair size={20} source={[btcLogo, usdLogo]} />
          <span className={styles.pair}>{data.pair.base.code}/{data.pair.counter.code}</span>
        </div>
      ),
    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      key: '2',
      sortFunc: () => {},
      render: (data) => data.tvl,
    },
    {
      title: 'Volume 24h',
      dataIndex: 'volume24',
      key: '3',
      sortFunc: () => {},
      render: (data) => data.volume24h,
    },
    {
      title: 'Volume 7d',
      dataIndex: 'volume7',
      key: '4',
      sortFunc: () => {},
      render: (data) => data.volume7d,
    },
  ];

  const data = Array(6).fill(
    {
      pair: { base: { code: 'BTC', logo: btcLogo }, counter: { code: 'USD', logo: usdLogo } },
      tvl: '$100',
      volume24h: '$12',
      volume7d: '$7',
    },
  );

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
                  <LiquidityChart style={{ marginTop: '-4px' }} />
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
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
