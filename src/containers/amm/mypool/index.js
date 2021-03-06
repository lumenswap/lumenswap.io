import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'containers/amm/AMMHeader';
import Button from 'components/Button';
import AddLiquidity from 'containers/amm/mypool/AddLiquidity';
import { openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import {
  getAssetDetails, isSameAsset, getAssetFromLPAsset,
} from 'helpers/asset';
import { fetchAccountDetails } from 'api/stellar';
import { getPoolDetailsById } from 'api/stellarPool';
import BN from 'helpers/BN';
import ServerSideLoading from 'components/ServerSideLoading';
import useDefaultTokens from 'hooks/useDefaultTokens';
import { extractTokenFromCode } from 'helpers/defaultTokenUtils';
import MyPoolData from './myPoolData';
import styles from './styles.module.scss';

function calculateBalanceUSD(data, xlmPrice, lspPrice, defaultTokens) {
  const tokenA = getAssetFromLPAsset(data.reserves[0].asset);
  const tokenB = getAssetFromLPAsset(data.reserves[1].asset);

  if (isSameAsset(tokenA, getAssetDetails(extractTokenFromCode('USDC', defaultTokens)))) {
    return new BN(data.calculateUserBalance(data.reserves[0].amount))
      .times(2)
      .toFixed(7);
  }

  if (isSameAsset(tokenB, getAssetDetails(extractTokenFromCode('USDC', defaultTokens)))) {
    return new BN(data.calculateUserBalance(data.reserves[1].amount))
      .times(2)
      .toFixed(7);
  }

  if (tokenA.isNative()) {
    return new BN(data.calculateUserBalance(data.reserves[0].amount))
      .times(xlmPrice)
      .times(2)
      .toFixed(7);
  }

  if (tokenB.isNative()) {
    return new BN(data.calculateUserBalance(data.reserves[1].amount))
      .times(xlmPrice)
      .times(2)
      .toFixed(7);
  }

  if (isSameAsset(tokenA, getAssetDetails(extractTokenFromCode('LSP', defaultTokens)))) {
    return new BN(data.calculateUserBalance(data.reserves[1].amount))
      .times(lspPrice)
      .times(2)
      .toFixed(7);
  }

  if (isSameAsset(tokenB, getAssetDetails(extractTokenFromCode('LSP', defaultTokens)))) {
    return new BN(data.calculateUserBalance(data.reserves[1].amount))
      .times(lspPrice)
      .times(2)
      .toFixed(7);
  }

  return '-';
}

async function fetchData(userAddress, xlmPrice, setPools, lspPrice, defaultTokens) {
  const result = await fetchAccountDetails(userAddress);
  const filteredBalances = result.balances
    .filter((balance) => balance.asset_type === 'liquidity_pool_shares')
    .slice(0, 20);
  const fetchedPools = await Promise.all(
    filteredBalances.map((pool) => getPoolDetailsById(pool.liquidity_pool_id).then((res) => ({
      ...res,
      userShare: pool.balance,
      calculateUserBalance: (a) => {
        if (new BN(res.total_shares).eq(0)) {
          return 0;
        }
        return new BN(pool.balance).times(a).div(res.total_shares);
      },
    }))),
  );
  const poolsWithBalances = fetchedPools.map((pool) => {
    const balanceUSD = calculateBalanceUSD(pool, xlmPrice, lspPrice, defaultTokens);
    return {
      ...pool,
      balanceUSD,
    };
  });

  setPools(poolsWithBalances);
}

function MyPoolPage() {
  const [pools, setPools] = useState(null);
  const userAddress = useSelector((state) => state.user.detail.address);
  const xlmPrice = useSelector((state) => state.xlmPrice);
  const lspPrice = useSelector((state) => state.lspPrice);
  const isLogged = useSelector((state) => state.user.logged);
  const router = useRouter();
  const dispatch = useDispatch();
  const defaultTokens = useDefaultTokens();

  const handleSelectAsset = (newSelectTokens) => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'New pool',
          className: 'main',
        },
        content: <AddLiquidity
          selectAsset={handleSelectAsset}
          {...newSelectTokens}
          afterAdd={() => fetchData(userAddress, xlmPrice, setPools, lspPrice, defaultTokens)}
        />,
      }),
    );
  };

  const openModal = () => {
    dispatch(
      openModalAction({
        modalProps: {
          title: 'New pool',
          className: 'main',
        },
        content: <AddLiquidity
          tokenA={getAssetDetails(extractTokenFromCode('XLM', defaultTokens))}
          tokenB={getAssetDetails(extractTokenFromCode('LSP', defaultTokens))}
          selectAsset={handleSelectAsset}
          afterAdd={() => fetchData(userAddress, xlmPrice, setPools, null, defaultTokens)}
        />,
      }),
    );
  };

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.amm.pool.root());
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      fetchData(userAddress, xlmPrice, setPools, lspPrice, defaultTokens);
    }
  }, [isLogged, userAddress]);

  return (
    <div className="container-fluid">
      <Head>
        <title>My Pool | Lumenswap</title>
      </Head>
      <AMMHeader />
      <ServerSideLoading>
        <div className={classNames('layout main', styles.main)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12 px-xl-5 px-lg-3 px-md-3 px-sm-3 px-3">
              <div className={styles['header-table']}>
                <h1 className={styles.title}>My pools</h1>
                <Button
                  variant="primary"
                  content="New Pool"
                  className={styles.btn}
                  onClick={openModal}
                />
              </div>
              <MyPoolData
                pools={pools}
                afterWAD={() => fetchData(userAddress, xlmPrice, setPools)}
              />
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </div>
  );
}

export default MyPoolPage;
