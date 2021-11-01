import Head from 'next/head';
import classNames from 'classnames';
import defaultTokens from 'tokens/defaultTokens';
import AMMHeader from 'components/AMMHeader';
import ArrowRight from 'assets/images/arrowRight';
import CurrencyPair from 'components/CurrencyPair';
import numeral from 'numeral';
import CStatistics from 'components/CStatistics';
import moment from 'moment';
import CTable from 'components/CTable';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import Image from 'next/image';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import iconRightLogo from '../../../../../public/images/arrow-right-icon.png';
import iconRefresh from '../../../../../public/images/icon-refresh.png';
import questionLogo from '../../../../../public/images/question.png';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>You have no swap</span>
  </div>
);

const Details = ({ poolDetail }) => {
  const a1 = poolDetail.reserves[0].asset.split(':');
  const a2 = poolDetail.reserves[1].asset.split(':');
  const refinedA = getAssetDetails({
    code: a1[0],
    issuer: a1[1],
  });

  const refinedB = getAssetDetails({
    code: a2[0],
    issuer: a2[1],
  });

  const tokenA = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedA));
  const tokenB = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedB));
  const grid1 = 'col-xl-7 col-lg-6 col-md-6 col-sm-12 col-12';

  const TVLInfo = () => (
    <div className={styles['pool-info-container']}>
      <span className={styles['pool-info-content']}>
        {numeral(poolDetail.reserves[0].amount).format('0,0')} {refinedA.code}
      </span>
      <div className={styles.dot} />
      <span className={styles['pool-info-content']}>
        {numeral(poolDetail.reserves[1].amount).format('0,0')} {refinedB.code}
      </span>
      <div className={styles['refresh-logo']}>
        <Image src={iconRefresh} width={18} height={18} />
      </div>
    </div>
  );

  const TrustLineInfo = () => (
    <span className={styles['pool-info-content']}>
      {numeral(poolDetail.total_trustlines).format('0,0')}
    </span>
  );

  const ShareInfo = () => (
    <span className={styles['pool-info-content']}>
      {numeral(poolDetail.total_shares).format('0,0')}
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
        >
          {minimizeAddress(pool.tx)}
        </a>
      ),
    },
    {
      title: 'info',
      dataIndex: 'info',
      key: 2,
      render: (pool) => (
        <div className={styles['table-info-row']}>
          <span>{numeral(pool.info).format('0,0')} {refinedA.code}</span>
          <div><Image src={iconRightLogo} height={14} width={14} /></div>
          <span>{numeral(pool.info / 5).format('0,0')} {refinedB.code}</span>
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

  return (
    <div className="container-fluid pb-5">
      <Head>
        {/* <title>{tokens && `${tokens.tokenA}/${tokens.tokenB}`} | Lumenswap</title> */}
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
                  <div className="ml-2">{refinedA.code}/{refinedB.code}</div>
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
                  dataSource={[]}
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
