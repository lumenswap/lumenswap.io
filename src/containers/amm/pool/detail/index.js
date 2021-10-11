import { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import defaultTokens from 'tokens/defaultTokens';
import AMMHeader from 'components/AMMHeader';
import ArrowRight from 'assets/images/arrowRight';
import CurrencyPair from 'components/CurrencyPair';
import Loading from 'components/Loading';
import numeral from 'numeral';
import CStatistics from 'components/CStatistics';
import moment from 'moment';
import CTable from 'components/CTable';
import fetchPoolDetails from 'helpers/poolDetailsAPI';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import Image from 'next/image';
import iconRightLogo from '../../../../../public/images/arrow-right-icon.png';
import iconRefresh from '../../../../../public/images/icon-refresh.png';
import questionLogo from '../../../../../public/images/question.png';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>You have no swap</span>
  </div>
);

const Details = ({ tokens }) => {
  const [data, setData] = useState(null);
  const tokenA = defaultTokens.find((token) => token.code === tokens.tokenA);
  const tokenB = defaultTokens.find((token) => token.code === tokens.tokenB);
  const grid1 = 'col-xl-7 col-lg-6 col-md-6 col-sm-12 col-12';

  const TVLInfo = () => (
    <div className={styles['pool-info-container']}>
      <span className={styles['pool-info-content']}>
        {numeral(data?.info.tvl1).format('0,0')} {tokenA?.code || tokens.tokenA}
      </span>
      <div className={styles.dot} />
      <span className={styles['pool-info-content']}>
        {numeral(data?.info.tvl2).format('0,0')} {tokenB?.code || tokens.tokenB}
      </span>
      <div className={styles['refresh-logo']}><Image src={iconRefresh} width={18} height={18} /></div>
    </div>
  );
  const TrustLineInfo = () => (
    <span className={styles['pool-info-content']}>
      {numeral(data?.info.trustline).format('0,0')}
    </span>
  );

  const ShareInfo = () => (
    <span className={styles['pool-info-content']}>
      {numeral(data?.info.share).format('0,0')}
    </span>
  );

  const infoBlocks = [
    {
      title: 'TVL',
      content: <TVLInfo />,
    },
    {
      title: 'Trustline',
      content: <TrustLineInfo />
      ,
    },
    {
      title: 'Share',
      content: <ShareInfo />,
    },
  ];

  const tableHeaders = [
    {
      title: 'TX',
      dataIndex: 'tx',
      key: 1,
      render: (pool) => (
        <a
          className={styles['tx-link']}
          href={generateTransactionURL(pool.tx)}
          target="_blank"
          rel="noreferrer"
        >{minimizeAddress(pool.tx)}
        </a>
      ),
    },
    {
      title: 'info',
      dataIndex: 'info',
      key: 2,
      render: (pool) => (
        <div className={styles['table-info-row']}>
          <span>{numeral(pool.info).format('0,0')} {tokenA?.code || tokens.tokenA}</span>
          <div><Image src={iconRightLogo} height={14} width={14} /></div>
          <span>{numeral(pool.info / 5).format('0,0')} {tokenB?.code || tokens.tokenB}</span>
        </div>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 3,
      render: (pool) => <span>{moment(pool.time).fromNow()}</span>,
    },
  ];

  useEffect(() => {
    fetchPoolDetails().then((poolData) => {
      setData(poolData);
    });
  }, []);

  if (!data) {
    return (
      <div>
        <Head>
          <title>{tokens && `${tokens.tokenA}/${tokens.tokenB}`} | Lumenswap</title>
        </Head>
        <AMMHeader />
        <div className={styles['loading-container']}>
          <Loading size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid pb-5">
      <Head>
        <title>{tokens && `${tokens.tokenA}/${tokens.tokenB}`} | Lumenswap</title>
      </Head>
      <AMMHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-11 col-md-12 col-sm-12 col-12">
            <div className="row align-items-center">
              <div className={grid1}>
                <h1 className={styles.label}>
                  Pool
                  <div className="mx-2">
                    <ArrowRight />
                  </div>
                  <CurrencyPair
                    size={26}
                    source={[tokenA?.logo ?? questionLogo, tokenB?.logo ?? questionLogo]}
                  />
                  <div className="ml-2">{tokens && `${tokens.tokenA}/${tokens.tokenB}`}</div>
                </h1>
              </div>
            </div>
            <div className="row p">
              <div className={classNames(styles['info-pool'], 'col-12')}>
                <CStatistics className={styles['c-statistic']} blocks={infoBlocks} />
              </div>
              <div className="col-12"> <h1 className={styles.title}>Swaps</h1></div>
              <div className="col-12">
                <CTable
                  columns={tableHeaders}
                  noDataMessage={NoDataMessage}
                  dataSource={data?.swaps}
                  className={styles.table}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
