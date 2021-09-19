import Head from 'next/head';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import ObmHeader from 'components/ObmHeader';

import styles from './styles.module.scss';

const LiquidityChart = dynamic(() => import('../../components/LiquidityChart'), {
  ssr: false,
});

const VolumeChart = dynamic(() => import('../../components/VolumeChart'), {
  ssr: false,
});

const Stats = () => (
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
            <div className="col-6">
              <div className={classNames(styles.card, styles['card-chart'])}>
                <LiquidityChart style={{ marginTop: '-4px' }} />
              </div>
            </div>
            <div className="col-6">
              <div className={classNames(styles.card, styles['card-chart'])}>
                <VolumeChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Stats;
