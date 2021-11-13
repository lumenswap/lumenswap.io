import Head from 'next/head';
import classNames from 'classnames';
import defaultTokens from 'tokens/defaultTokens';
import AMMHeader from 'components/AMMHeader';
import Breadcrumb from 'components/BreadCrumb';
import CurrencyPair from 'components/CurrencyPair';
import Image from 'next/image';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import { useSelector } from 'react-redux';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import { chartData } from 'api/chartsFakeData';
import { useEffect, useState } from 'react';
import CTabs from 'components/CTabs';
import useIsLogged from 'hooks/useIsLogged';
import BN from 'helpers/BN';
import { fetchAccountDetails } from 'api/stellar';
import fetchPoolSwaps from 'api/poolDetailsSwaps';
import humanAmount from 'helpers/humanAmount';
import { getPoolOperationsAPI } from 'api/stellarPool';
import { getTVLInUSD } from 'helpers/stellarPool';
import urlMaker from 'helpers/urlMaker';
import PoolMultiCharts from './PoolMultiCharts';
import PoolDetailsTabContent from './PoolDetailsTabContent';
import refreshIcon from '../../../../assets/images/refresh-icon.png';
import equalIcon from '../../../../assets/images/equal-icon.png';
import styles from './styles.module.scss';
import questionLogo from '../../../../../public/images/question.png';

async function loadUserPool(setUserShare, isLogged, userAddress, poolId) {
  if (isLogged) {
    try {
      const userData = await fetchAccountDetails(userAddress);
      for (const balance of userData.balances) {
        if (balance.asset_type === 'liquidity_pool_shares' && balance.liquidity_pool_id === poolId) {
          setUserShare(balance.balance);
          break;
        }
      }
    // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

// async function reloadPoolDetail(setPoolDetail, poolId, router) {
//   try {
//     const poolDetail = await getPoolDetailsById(poolId);
//     setPoolDetail(poolDetail);
//   } catch (e) {
//     router.push(urlMaker.pool.root());
//   }
// }

const Details = ({ poolDetail: initPoolDetail }) => {
  const [userShare, setUserShare] = useState(null);
  const isLogged = useIsLogged();
  const userAddress = useSelector((state) => state.user.detail.address);
  const [poolDetail, setPoolDetail] = useState(initPoolDetail);
  const refinedA = getAssetFromLPAsset(poolDetail.reserves[0].asset);
  const refinedB = getAssetFromLPAsset(poolDetail.reserves[1].asset);
  const [poolOperations, setPoolOperations] = useState(null);
  const [chartsData, setChartsData] = useState(chartData);
  const [reverseHeaderInfo, setReverseHeaderInfo] = useState(false);
  const [poolSwaps, setPoolSwaps] = useState(null);

  const tokenA = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedA));
  const tokenB = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedB));
  const grid2 = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12';

  let HeaderInfoAsset = `${new BN(initPoolDetail.reserves[0].amount).div(initPoolDetail.reserves[1].amount)}`;

  if (reverseHeaderInfo) {
    HeaderInfoAsset = `${new BN(initPoolDetail.reserves[1].amount).div(initPoolDetail.reserves[0].amount)}`;
  }

  useEffect(() => {
    loadUserPool(setUserShare, isLogged, userAddress, poolDetail.id);
  }, [isLogged, userAddress]);

  useEffect(() => {
    fetchPoolSwaps().then((data) => setPoolSwaps(data));
    async function loadData() {
      const operations = await getPoolOperationsAPI(poolDetail.id, { order: 'desc', limit: 20 });
      setPoolOperations(operations);
    }

    loadData();
  }, []);

  const breadCrumbData = [
    {
      name: 'Pools',
      url: urlMaker.pool.root(),
    },
    {
      render: () => (
        <div className={styles['pair-data']}>
          <CurrencyPair
            size={26}
            source={[tokenA?.logo ?? questionLogo, tokenB?.logo ?? questionLogo]}
          />
          <div className="ml-2">{refinedA.code}/{refinedB.code}</div>
        </div>
      ),
    },
  ];
  const xlmPrice = useSelector((state) => state.xlmPrice);

  const usdTvl = getTVLInUSD(poolDetail.reserves, xlmPrice);

  const tabs = [
    {
      title: 'Swaps',
      id: 'swaps',
    },
    {
      title: 'Pool activities',
      id: 'activity',
    },
  ];

  const handleReverseHeaderInfo = () => {
    setReverseHeaderInfo((prev) => !prev);
  };

  return (
    <div className="container-fluid pb-5">
      <Head>
        <title>Pool - {refinedA.getCode()}/{refinedB.getCode()} | Lumenswap</title>
      </Head>
      <AMMHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-11 col-md-12 col-sm-12 col-12">
            <div className="row align-items-center">
              <div className={grid2}>
                <div className={styles['header-container']}>
                  <div className={styles['bread-crumb-container']}>
                    <Breadcrumb
                      data={breadCrumbData}
                    />
                  </div>
                  <div className={styles['header-info-container']}>
                    <span className={styles['header-info-container-texts']}>1 {reverseHeaderInfo ? refinedB.getCode() : refinedA.getCode()}</span>
                    <div className={styles['equal-icon']}><Image src={equalIcon} width={14} height={8} /></div>
                    <span className={styles['header-info-container-texts']}>{HeaderInfoAsset} {reverseHeaderInfo ? refinedA.getCode() : refinedB.getCode()}</span>
                    <div onClick={handleReverseHeaderInfo} className={styles['refresh-icon']}><Image src={refreshIcon} width={18} height={18} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames(styles['info-containers'], 'row p')}>
              <div className="col-md-8 col-12">
                <PoolMultiCharts chartsData={chartData} />
              </div>
              <div className={classNames(styles['info-pool-container'], 'col-md-4 col-12')}>
                <div className={styles['tvl-info-container']}>
                  <div className={styles['tvl-info-header']}>
                    <span className={styles['tvl-info-header-text']}>TVL</span>
                    <span className={styles['tvl-info-header-number']}>${usdTvl ?? '-'}</span>
                  </div>
                  <div className={styles['tvl-info-items']}>
                    <div className={styles['tvl-info-item']}><span>{humanAmount(poolDetail.reserves[0].amount, true)} {refinedA.getCode()}</span></div>
                    <div className={styles['tvl-info-item']}><span>{humanAmount(poolDetail.reserves[1].amount, true)} {refinedB.getCode()}</span></div>
                  </div>
                </div>
                <div className={styles['volume-info-container']}>
                  <div className={styles['volume-info-item']}>
                    <span>24h fees</span>
                    <span>$200</span>
                  </div>
                  <div className={styles['volume-info-item']}>
                    <span>Volume 24h</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className={styles.card}>
                  <CTabs
                    tabs={tabs}
                    tabContent={PoolDetailsTabContent}
                    customTabProps={{ poolOperations, poolSwaps }}
                    className={styles.tabs}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
