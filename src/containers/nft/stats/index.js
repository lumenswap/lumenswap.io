import Head from 'next/head';
import classNames from 'classnames';

import ObmHeader from 'components/ObmHeader';
import TVLChart from 'components/TVLChart';

import styles from './styles.module.scss';

const NFTStats = () => {
  const statisticBlocks = [
    { title: 'Volume 24h', value: 200, valueText: 'LSP' },
    { title: 'Volume 7d', value: 1023400, valueText: 'LSP' },
    { title: 'Total number of trades', value: 106 },
  ];

  return (
    <div className="container-fluid">
      <Head>
        <title>NFT Stats | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>Stats</h1>
            <div className={classNames(styles.card, styles['card-info'])}>
              <div className="row mx-0">
                {statisticBlocks.map((block, index) => (
                  <div className={classNames('col-lg-4 col-md-4 col-sm-12 col-12 px-0', styles['block-col'])} key={index}>
                    <div className={styles.block}>
                      <div className={styles['block-subject']}>{block.title}</div>
                      <div className={styles['block-info']}>{block.value} <span>{block.valueText}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={classNames(styles.card, styles['card-chart'])}>
              <div>Volume</div>
              <div className="row flex-nowrap mt-5 align-items-end">
                <div className="col">
                  <TVLChart showLabel={false} />
                </div>
                <div className="col-auto">
                  <div className={styles.date}>
                    Date
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTStats;
