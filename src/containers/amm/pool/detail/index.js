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
import { useDispatch } from 'react-redux';
import DepositLiquidity from 'containers/amm/DepositLiquidity';
import WithdrawLiquidity from 'containers/amm/WithdrawLiquidity';
import { openModalAction } from 'actions/modal';
import Button from 'components/Button';
import styles from './styles.module.scss';
import questionLogo from '../../../../../public/images/question.png';
import iconRefresh from '../../../../../public/images/icon-refresh.png';
import secondStyles from '../../../../components/Button/styles.module.scss';
import iconRightLogo from '../../../../../public/images/arrow-right-icon.png';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>You have no swap</span>
  </div>
);

const Details = ({ poolDetail }) => {
  const dispatch = useDispatch();
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
  const grid2 = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12';

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
  console.log(tokenA, tokenB);
  let tokenAInfo;
  let tokenBInfo;
  if (tokenA) {
    tokenAInfo = tokenA;
  } else {
    tokenAInfo = { ...refinedA, logo: questionLogo };
  }
  if (tokenB) {
    tokenBInfo = tokenB;
  } else {
    tokenBInfo = { ...refinedB, logo: questionLogo };
  }

  const handleDeposit = () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Deposit Liquidity',
          className: 'main',
        },
        content: <DepositLiquidity
          tokenA={tokenAInfo}
          tokenB={tokenBInfo}
        />,
      }),
    );
  };
  const handleWithdraw = () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Withdraw Liquidity',
          className: 'main',
        },
        content: <WithdrawLiquidity
          tokenA={tokenAInfo}
          tokenB={tokenBInfo}
        />,
      }),
    );
  };

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
              <div className={grid2}>
                <div className={styles['header-container']}>
                  <div>
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
                  <div className={styles['btns-container']}>
                    <Button className={classNames(styles['deposit-btn'], secondStyles['button-primary'])} content="Deposit Liquidity" onClick={handleDeposit} />
                    <Button className={classNames(styles['withdraw-btn'], secondStyles['button-basic'])} content="Withdraw Liquidity" onClick={handleWithdraw} />
                  </div>
                </div>
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
