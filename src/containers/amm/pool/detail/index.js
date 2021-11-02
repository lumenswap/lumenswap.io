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
import { useDispatch, useSelector } from 'react-redux';
import WithdrawLiquidity from 'containers/amm/WithdrawLiquidity';
import { openModalAction } from 'actions/modal';
import Button from 'components/Button';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import { useEffect, useState } from 'react';
import useIsLogged from 'hooks/useIsLogged';
import { fetchAccountDetails } from 'api/stellar';
import humanAmount from 'helpers/humanAmount';
import BN from 'helpers/BN';
import { getPoolOperationsAPI } from 'api/stellarPool';
import AddLiquidity from 'containers/amm/AddLiquidity';
import styles from './styles.module.scss';
import questionLogo from '../../../../../public/images/question.png';
import iconRefresh from '../../../../../public/images/icon-refresh.png';
import secondStyles from '../../../../components/Button/styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>There is no activity</span>
  </div>
);

const ShareInfo = ({ poolDetail, isLogged, userShare }) => {
  const ShareInfoContainer = ({ children }) => (
    <span className={styles['pool-info-content']}>
      {children}
    </span>
  );

  if (!isLogged) {
    return (
      <ShareInfoContainer>
        -
      </ShareInfoContainer>
    );
  }

  if (!userShare) {
    return (
      <ShareInfoContainer>
        Loading...
      </ShareInfoContainer>
    );
  }

  if (new BN(userShare).eq(0)) {
    return (
      <ShareInfoContainer>
        -
      </ShareInfoContainer>
    );
  }

  const shareA = new BN(userShare)
    .times(poolDetail.reserves[0].amount)
    .div(poolDetail.total_shares);
  const shareB = new BN(userShare)
    .times(poolDetail.reserves[1].amount)
    .div(poolDetail.total_shares);

  return (
    <span className={styles['pool-info-content']}>
      {humanAmount(shareA.toFixed(7))} {getAssetFromLPAsset(poolDetail.reserves[0].asset).getCode()}{' / '}
      {humanAmount(shareB.toFixed(7))} {getAssetFromLPAsset(poolDetail.reserves[1].asset).getCode()}
    </span>
  );
};

const Details = ({ poolDetail }) => {
  const [userShare, setUserShare] = useState(null);
  const isLogged = useIsLogged();
  const userAddress = useSelector((state) => state.user.detail.address);
  const dispatch = useDispatch();
  const refinedA = getAssetFromLPAsset(poolDetail.reserves[0].asset);
  const refinedB = getAssetFromLPAsset(poolDetail.reserves[1].asset);
  const [poolOperations, setPoolOperations] = useState(null);

  const tokenA = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedA));
  const tokenB = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedB));
  const grid2 = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12';

  useEffect(() => {
    async function loadData() {
      if (isLogged) {
        try {
          const userData = await fetchAccountDetails(userAddress);
          for (const balance of userData.balances) {
            if (balance.asset_type === 'liquidity_pool_shares' && balance.liquidity_pool_id === poolDetail.id) {
              setUserShare(balance.balance);
              return;
            }
          }

          setUserShare(0);
        } catch (e) {
          setUserShare(0);
        }
      }
    }

    loadData();
  }, [isLogged, userAddress]);

  useEffect(() => {
    async function loadData() {
      const operations = await getPoolOperationsAPI(poolDetail.id, { order: 'desc', limit: 20 });
      setPoolOperations(operations);
    }

    loadData();
  }, []);

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

  const infoBlocks = [
    {
      title: 'TVL',
      content: <TVLInfo />,
      tooltip: 'tooltip',
    },
    {
      title: 'Trustline',
      content: <TrustLineInfo />,
      tooltip: 'tooltip',
    },
    {
      title: 'Your Share',
      content: <ShareInfo
        poolDetail={poolDetail}
        isLogged={isLogged}
        userShare={userShare}
      />,
      tooltip: 'tooltip',
    },
  ];

  const tableHeaders = [
    {
      title: 'Operation ID',
      dataIndex: 'operationId',
      key: 1,
      render: (operation) => (
        <a
          className={styles['tx-link']}
          href={generateTransactionURL(operation.id)}
          target="_blank"
          rel="noreferrer"
        >
          {minimizeAddress(operation.id)}
        </a>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 2,
      render: (operation) => {
        let type = 'Unknown';

        if (operation.type === 'change_trust') {
          if (new BN(operation.limit).isEqualTo(0)) {
            type = 'Remove Trustline';
          } else {
            type = 'Add Trustline';
          }
        }

        if (operation.type === 'liquidity_pool_deposit') {
          type = 'Deposit';
        }

        if (operation.type === 'liquidity_pool_withdraw') {
          type = 'Withdraw';
        }

        return (
          <div className={styles['table-info-row']}>
            <span>{type}</span>
          </div>
        );
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 3,
      render: (operation) => <span>{moment(operation.created_at).fromNow()}</span>,
    },
  ];

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
        content: <AddLiquidity
          tokenA={refinedA}
          tokenB={refinedB}
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
        <title>{refinedA.getCode()}/{refinedB.getCode()} | Lumenswap</title>
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
                    <Button
                      className={classNames(styles['deposit-btn'], secondStyles['button-primary'])}
                      content="Deposit Liquidity"
                      onClick={handleDeposit}
                    />
                    <Button
                      className={classNames(styles['withdraw-btn'], secondStyles['button-basic'])}
                      content="Withdraw Liquidity"
                      onClick={handleWithdraw}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row p">
              <div className={classNames(styles['info-pool'], 'col-12')}>
                <CStatistics className={styles['c-statistic']} blocks={infoBlocks} />
              </div>
              <div className="col-12"> <h1 className={styles.title}>Latest activity</h1></div>
              <div className="col-12">
                <CTable
                  columns={tableHeaders}
                  noDataMessage={NoDataMessage}
                  dataSource={poolOperations}
                  className={styles.table}
                  loading={poolOperations === null}
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
