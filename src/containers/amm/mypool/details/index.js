import AMMHeader from 'components/AMMHeader';
import Head from 'next/head';
import classNames from 'classnames';
import Breadcrumb from 'components/BreadCrumb';
import CurrencyPair from 'components/CurrencyPair';
import urlMaker from 'helpers/urlMaker';
import getAssetDetails from 'helpers/getAssetDetails';
import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import { useSelector, useDispatch } from 'react-redux';
import { getTVLInUSD } from 'helpers/stellarPool';
import { fetchAccountDetails } from 'api/stellar';
import humanAmount from 'helpers/humanAmount';
import CCricularProgressBar from 'components/CCricularProgressBar';
import WithdrawLiquidity from 'containers/amm/WithdrawLiquidity';
import DepositLiquidity from 'containers/amm/DepositLiquidity';
import { openModalAction } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import secondStyles from '../../../../components/Button/styles.module.scss';
import questionLogo from '../../../../../public/images/question.png';
import styles from './styles.module.scss';

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

function MyPoolDetails({ poolDetail }) {
  const [userShare, setUserShare] = useState(null);
  const router = useRouter();
  const userAddress = useSelector((state) => state.user.detail.address);
  const dispatch = useDispatch();
  const xlmPrice = useSelector((state) => state.xlmPrice);
  const isLogged = useIsLogged();
  const refinedA = getAssetFromLPAsset(poolDetail.reserves[0].asset);
  const refinedB = getAssetFromLPAsset(poolDetail.reserves[1].asset);
  const tokenA = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedA));
  const tokenB = defaultTokens.find((token) => isSameAsset(getAssetDetails(token), refinedB));
  const handleDeposit = () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'Deposit Liquidity',
          className: 'main',
        },
        content: <DepositLiquidity tokenA={refinedA} tokenB={refinedB} />,
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
        content: <WithdrawLiquidity tokenA={refinedA} tokenB={refinedB} />,
      }),
    );
  };
  const breadCrumbData = [
    {
      name: 'My Pools',
      url: urlMaker.myPool.root(),
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

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.pool.root());
    }
    loadUserPool(setUserShare, isLogged, userAddress, poolDetail.id);
  }, []);
  const usdTvl = getTVLInUSD(poolDetail.reserves, xlmPrice);
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
                      value={userShare ?? 0}
                      text={userShare ? `${parseFloat(userShare).toFixed(2)}%` : 0}
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
                      <span>${usdTvl}</span>
                    </div>
                    <div className={styles['liquidity-info-items']}>
                      <div className={styles['liquidity-info-item']}>
                        <span>
                          {humanAmount(poolDetail.reserves[0].amount, true)}
                        </span>
                        <span>
                          {refinedA.getCode()}
                        </span>
                      </div>
                      <div className={styles['liquidity-info-item']}>
                        <span>
                          {humanAmount(poolDetail.reserves[1].amount, true)}
                        </span>
                        <span>
                          {refinedB.getCode()}
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
