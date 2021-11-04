import Head from 'next/head';
import classNames from 'classnames';
import AMMHeader from 'components/AMMHeader';
import Button from 'components/Button';
import AddLiquidity from 'containers/amm/AddLiquidity';
import { openModalAction } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import XLM from 'tokens/XLM';
import LSP from 'tokens/LSP';
import getAssetDetails from 'helpers/getAssetDetails';
import { fetchAccountDetails } from 'api/stellar';
import { getPoolDetailsById } from 'api/stellarPool';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import isSameAsset from 'helpers/isSameAsset';
import USDC from 'tokens/USDC';
import BN from 'helpers/BN';
import MyPoolData from './myPoolData';
import styles from './styles.module.scss';

function calculateBalanceUSD(data, xlmPrice) {
  let balance = '-';
  const tokenA = getAssetFromLPAsset(data.reserves[0].asset);
  const tokenB = getAssetFromLPAsset(data.reserves[1].asset);

  if (isSameAsset(tokenA, getAssetDetails(USDC))) {
    balance = new BN(data.reserves[0].amount).times(2).toFixed(7);
  }

  if (isSameAsset(tokenB, getAssetDetails(USDC))) {
    balance = new BN(data.reserves[1].amount).times(2).toFixed(7);
  }

  if (tokenA.isNative()) {
    balance = new BN(data.reserves[0].amount).times(xlmPrice).times(2).toFixed(7);
  }

  if (tokenB.isNative()) {
    balance = new BN(data.reserves[1].amount).times(xlmPrice).times(2).toFixed(7);
  }

  return balance;
}

async function fetchData(userAddress, xlmPrice, setPools) {
  const result = await fetchAccountDetails(userAddress);
  const filteredBalances = result.balances
    .filter((balance) => balance.asset_type === 'liquidity_pool_shares')
    .slice(0, 20);
  const fetchedPools = await Promise.all(
    filteredBalances.map((pool) => getPoolDetailsById(pool.liquidity_pool_id).then((res) => ({
      ...res,
      userShare: pool.balance,
    }))),
  );

  const poolsWithBalances = fetchedPools.map((pool) => {
    const balanceUSD = calculateBalanceUSD(pool, xlmPrice);
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
  const isLogged = useSelector((state) => state.user.logged);
  const router = useRouter();
  const dispatch = useDispatch();

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
          afterAdd={() => fetchData(userAddress, xlmPrice, setPools)}
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
          tokenA={getAssetDetails(XLM)}
          tokenB={getAssetDetails(LSP)}
          selectAsset={handleSelectAsset}
          afterAdd={() => fetchData(userAddress, xlmPrice, setPools)}
        />,
      }),
    );
  };

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.pool.root());
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      fetchData(userAddress, xlmPrice, setPools);
    }
  }, [isLogged, userAddress]);

  return (
    <div className="container-fluid">
      <Head>
        <title>My Pool | Lumenswap</title>
      </Head>
      <AMMHeader />
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
            <MyPoolData pools={pools} afterWAD={() => fetchData(userAddress, xlmPrice, setPools)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPoolPage;
