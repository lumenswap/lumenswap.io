import isSameAsset from 'helpers/isSameAsset';
import CurrencyPair from 'components/CurrencyPair';
import getAssetDetails from 'helpers/getAssetDetails';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from 'actions/modal';
import DepositLiquidity from 'containers/amm/DepositLiquidity';
import WithdrawLiquidity from 'containers/amm/WithdrawLiquidity';
import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import { useEffect, useState } from 'react';
import { extractLogo, listOfKnownPoolIds } from 'helpers/assetUtils';
import { getPoolDetailsById } from 'api/stellarPool';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import humanAmount from 'helpers/humanAmount';
import USDC from 'tokens/USDC';
import BN from 'helpers/BN';
import { fetchAccountDetails } from 'api/stellar';
import Input from 'components/Input';
import styles from './styles.module.scss';

function NoDataMessage() {
  return <div className={styles['empty-table-container']}><span>There is no pool</span></div>;
}

function PoolData() {
  const [knownPools, setKnownPools] = useState(null);
  const xlmPrice = useSelector((state) => state.xlmPrice);
  const userAddress = useSelector((state) => state.user.detail.address);
  const [searchQuery, setSearchQuery] = useState('');
  const [userPoolShares, setUserPoolShares] = useState({});
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.replace(new RegExp('\\\\', 'g'), '\\\\'));
  };

  const renderModals = (data) => {
    const a1 = data.reserves[0].asset.split(':');
    const a2 = data.reserves[1].asset.split(':');
    const refinedA = getAssetDetails({
      code: a1[0],
      issuer: a1[1],
    });

    const refinedB = getAssetDetails({
      code: a2[0],
      issuer: a2[1],
    });

    const handleDeposit = (e) => {
      e.preventDefault();
      dispatch(
        openModalAction({
          modalProps: {
            title: 'Deposit Liquidity',
            className: 'main',
          },
          content: <DepositLiquidity
            tokenA={refinedA}
            tokenB={refinedB}
          />,
        }),
      );
    };

    const handleWithdraw = (e) => {
      e.preventDefault();
      dispatch(
        openModalAction({
          modalProps: {
            title: 'Withdraw Liquidity',
            className: 'main',
          },
          content: <WithdrawLiquidity
            tokenA={refinedA}
            tokenB={refinedB}
          />,
        }),
      );
    };

    return (
      <div className={styles['modal-btns']}>
        <div onClick={handleDeposit}>Deposit</div>
        {userPoolShares[data.id]
        && !(new BN(userPoolShares[data.id]).eq(0))
        && <div onClick={handleWithdraw}>Withdraw</div>}
      </div>
    );
  };

  const renderPoolInfo = (data) => {
    const assetA = getAssetFromLPAsset(data.reserves[0].asset);
    const assetB = getAssetFromLPAsset(data.reserves[1].asset);

    return (
      <div className={styles.pairs}>
        <CurrencyPair
          size={22}
          source={[extractLogo(assetA), extractLogo(assetB)]}
        />
        <span>{`${assetA.code}/${assetB.code}`}</span>
      </div>
    );
  };

  useEffect(() => {
    async function loadData() {
      const allPools = await Promise.all(listOfKnownPoolIds()
        .map((pool) => getPoolDetailsById(pool.id)
          .then((res) => ({
            ...res,
            pair: pool.pair,
            key: pool.id,
          })).catch(() => ({
            key: pool.id,
            id: pool.id,
            total_shares: 0,
            total_trustlines: 0,
            reserves: [
              {
                asset: `${pool.pair.base.code}:${pool.pair.base.issuer}`,
                amount: 0,
              },
              {
                asset: `${pool.pair.counter.code}:${pool.pair.counter.issuer}`,
                amount: 0,
              },
            ],
            pair: pool.pair,
          }))));

      setKnownPools(allPools);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const fetchedPoolShare = {};

      if (userAddress) {
        const userDetail = await fetchAccountDetails(userAddress);
        for (const balance of userDetail.balances) {
          if (balance.asset_type === 'liquidity_pool_shares') {
            fetchedPoolShare[balance.liquidity_pool_id] = balance.balance;
          }
        }
      }

      setUserPoolShares(fetchedPoolShare);
    }

    loadData();
  }, [userAddress]);

  const tableHeader = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: '1',
      render: renderPoolInfo,
    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      key: '2',
      render: (data) => {
        let balance = '-';
        const tokenA = getAssetFromLPAsset(data.reserves[0].asset);
        const tokenB = getAssetFromLPAsset(data.reserves[1].asset);

        if (isSameAsset(tokenA, getAssetDetails(USDC))) {
          balance = humanAmount(new BN(data.reserves[0].amount).times(2).toFixed(7), true);
        }

        if (isSameAsset(tokenB, getAssetDetails(USDC))) {
          balance = humanAmount(new BN(data.reserves[1].amount).times(2).toFixed(7), true);
        }

        if (tokenA.isNative()) {
          balance = humanAmount(
            new BN(data.reserves[0].amount).times(xlmPrice).times(2).toFixed(7),
            true,
          );
        }

        if (tokenB.isNative()) {
          balance = humanAmount(
            new BN(data.reserves[1].amount).times(xlmPrice).times(2).toFixed(7),
            true,
          );
        }

        return (
          <span className={styles.balance}>
            {balance !== '-' && '$'}{balance}
          </span>
        );
      },
    },
    {
      title: 'Accounts in pool',
      dataIndex: 'accounts',
      key: '5',
      render: (data) => humanAmount(data.total_trustlines),
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: '4',
    //   render: renderModals,
    // },
  ];

  let filteredPools = knownPools ? [...knownPools] : [];
  console.log(filteredPools);
  if (searchQuery) {
    filteredPools = filteredPools?.filter(
      (pool) => pool.pair.base.code
        .toLowerCase()
        .search(searchQuery.toLocaleLowerCase()) !== -1
        || pool.pair.counter.code
          .toLowerCase()
          .search(searchQuery.toLocaleLowerCase()) !== -1,
    ).map((item) => ({
      ...item,
    }));
  }

  const rowLink = (data) => urlMaker.pool.poolId(data.id);

  return (
    <div className={styles['table-container']}>
      {knownPools
      && (
        <div className={styles['search-box']}>
          <div className={styles.input}>
            <Input
              type="text"
              name="asset"
              id="asset"
              placeholder="Enter pair"
              onChange={handleSearch}
              height={40}
              fontSize={15}
            />
          </div>
        </div>
      )}
      <CTable
        columns={tableHeader}
        dataSource={filteredPools}
        noDataMessage={NoDataMessage}
        className={styles.table}
        rowLink={rowLink}
        loading={knownPools === null}
      />
    </div>
  );
}

export default PoolData;
