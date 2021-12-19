import AMMHeader from 'containers/amm/AMMHeader';
import Head from 'next/head';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import CurrencyPair from 'components/CurrencyPair';
import urlMaker from 'helpers/urlMaker';
import { getAssetFromLPAsset, extractLogoByToken } from 'helpers/asset';
import { useSelector, useDispatch } from 'react-redux';
import { getTVLInUSD } from 'helpers/stellarPool';
import { fetchAccountDetails } from 'api/stellar';
import humanAmount from 'helpers/humanAmount';
import CCricularProgressBar from 'containers/amm/mypool/details/CCricularProgressBar';
import WithdrawLiquidity from 'containers/amm/mypool/details/WithdrawLiquidity';
import DepositLiquidity from 'containers/amm/mypool/details/DepositLiquidity';
import { openModalAction } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BN from 'helpers/BN';
import { getPoolDetailsById } from 'api/stellarPool';
import secondStyles from '../../../../components/Button/styles.module.scss';
import styles from './styles.module.scss';

async function loadUserPool(setUserShare, isLogged, userAddress, poolId, setPoolDetail, router) {
  if (isLogged) {
    try {
      const userData = await fetchAccountDetails(userAddress);
      let found = false;
      for (const balance of userData.balances) {
        if (balance.asset_type === 'liquidity_pool_shares' && balance.liquidity_pool_id === poolId) {
          setUserShare(balance.balance);
          found = true;
          break;
        }
      }

      if (!found) {
        router.push(urlMaker.amm.myPool.root());
      } else {
        const poolDetail = await getPoolDetailsById(poolId);
        setPoolDetail(poolDetail);
      }
    // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function MyPoolDetails({ poolDetail: initPoolDetail }) {
  const [userShare, setUserShare] = useState(null);
  const router = useRouter();
  const userAddress = useSelector((state) => state.user.detail.address);
  const dispatch = useDispatch();
  const xlmPrice = useSelector((state) => state.xlmPrice);
  const isLogged = useIsLogged();
  const [poolDetail, setPoolDetail] = useState(initPoolDetail);
  const refinedA = getAssetFromLPAsset(poolDetail.reserves[0].asset);
  const refinedB = getAssetFromLPAsset(poolDetail.reserves[1].asset);

  const handleDeposit = () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Deposit Liquidity',
          className: 'main',
        },
        content: <DepositLiquidity
          tokenA={refinedA}
          tokenB={refinedB}
          afterDeposit={() => {
            loadUserPool(setUserShare, isLogged, userAddress, poolDetail.id, setPoolDetail, router);
          }}
        />,
      }),
    );
  };

  const handleWithdraw = async () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Withdraw Liquidity',
          className: 'main',
        },
        content: <WithdrawLiquidity
          tokenA={refinedA}
          tokenB={refinedB}
          afterWithdraw={() => {
            loadUserPool(setUserShare, isLogged, userAddress, poolDetail.id, setPoolDetail, router);
          }}
        />,
      }),
    );
  };
  const breadCrumbData = [
    {
      name: 'My Pools',
      url: urlMaker.amm.myPool.root(),
    },
    {
      render: () => (
        <div className={styles['pair-data']}>
          <CurrencyPair
            size={26}
            source={[extractLogoByToken(refinedA), extractLogoByToken(refinedB)]}
          />
          <div className="ml-2">{refinedA.code}/{refinedB.code}</div>
        </div>
      ),
    },
  ];

  const shareA = new BN(userShare)
    .times(poolDetail.reserves[0].amount)
    .div(poolDetail.total_shares);
  const shareB = new BN(userShare)
    .times(poolDetail.reserves[1].amount)
    .div(poolDetail.total_shares);

  let isLessThan0 = false;
  if (new BN(userShare).times(100).div(poolDetail.total_shares).lt(0.01)) {
    isLessThan0 = true;
  }

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.amm.pool.root());
    }
  }, [isLogged]);

  useEffect(() => {
    loadUserPool(setUserShare, isLogged, userAddress, poolDetail.id, router);
  }, []);

  useEffect(() => {
    if (new BN(userShare).isEqualTo(0)) {
      router.push(urlMaker.amm.myPool.root());
    }
  }, [userShare]);

  return (
    <div className="container-fluid">
      <Head>
        <title>My Pool - {refinedA.getCode()}/{refinedB.getCode()} | Lumenswap</title>
      </Head>
      <AMMHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12 px-xl-5 px-lg-3 px-md-3 px-sm-3 px-3">
            <div className={styles['header-container']}>
              <div className={styles['bread-crumb-container']}>
                <Breadcrumb
                  data={breadCrumbData}
                />
              </div>
              <div className={styles['btns-container']}>
                <Button
                  onClick={handleDeposit}
                  className={classNames(styles['deposit-btn'], secondStyles['button-primary'])}
                  content="Deposit"
                />
                <Button
                  onClick={handleWithdraw}
                  className={classNames(styles['withdraw-btn'], secondStyles['button-basic'])}
                  content="Withdraw"
                />
              </div>
            </div>
            <div className={styles['info-cards']}>
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className={styles['shares-info']}>
                    <div className={styles['share-info-texts']}>
                      <span className={styles['share-info-title']}>Shares</span>
                      <span className={styles['share-info-text']}>This is your share of the pool</span>
                    </div>
                    <CCricularProgressBar
                      value={isLessThan0 ? 0.01 : humanAmount(new BN(userShare).times(100)
                        .div(poolDetail.total_shares).toFixed(2))}
                      text={isLessThan0 ? '<0.01%' : `%${humanAmount(new BN(userShare).times(100).div(poolDetail.total_shares).toFixed(2))}`}
                      size={110}
                      strokeWidth={5}
                      className={styles.progressbar}
                      styles={{
                        root: {},
                        path: {
                          stroke: '#0e41f5',
                        },
                        trail: {
                          stroke: '#ecf0f5',
                          strokeWidth: 2,
                        },
                      }}
                    />
                  </div>
                  <div />
                </div>
                <div className="col-md-6 col-12">
                  <div className={styles['liquidity-info']}>
                    <div className={styles['liquidity-info-header']}>
                      <span>Liquidity</span>
                      <span>${getTVLInUSD(
                        [
                          {
                            asset: poolDetail.reserves[0].asset,
                            amount: shareA.toFixed(7),
                          },
                          {
                            asset: poolDetail.reserves[1].asset,
                            amount: shareB.toFixed(7),
                          },
                        ],
                        xlmPrice,
                      )}
                      </span>
                    </div>
                    <div className={styles['liquidity-info-items']}>
                      <div className={styles['liquidity-info-item']}>
                        <span>
                          {humanAmount(shareA.toFixed(7))}
                        </span>
                        <span>
                          {getAssetFromLPAsset(poolDetail.reserves[0].asset).code}
                        </span>
                      </div>
                      <div className={styles['liquidity-info-item']}>
                        <span>
                          {humanAmount(shareB.toFixed(7))}
                        </span>
                        <span>
                          {getAssetFromLPAsset(poolDetail.reserves[1].asset).code}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPoolDetails;
