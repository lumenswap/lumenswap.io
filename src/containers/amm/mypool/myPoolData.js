import { useEffect, useState } from 'react';
import CTable from 'components/CTable';
import isSameAsset from 'helpers/isSameAsset';
import defaultTokens from 'tokens/defaultTokens';
import getAssetDetails from 'helpers/getAssetDetails';
import urlMaker from 'helpers/urlMaker';
import useIsLogged from 'hooks/useIsLogged';
import { fetchAccountDetails } from 'api/stellar';
import { getPoolDetailsById } from 'api/stellarPool';
import CurrencyPair from 'components/CurrencyPair';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from 'actions/modal';
import WithdrawLiquidity from 'containers/amm/WithdrawLiquidity';
import DepositLiquidity from 'containers/amm/DepositLiquidity';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import { extractLogo } from 'helpers/assetUtils';
import questionLogo from '../../../../public/images/question.png';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>You have no pool</span>
  </div>
);

function MyPoolData() {
  const dispatch = useDispatch();
  const [pools, setPools] = useState(null);
  const userBalance = useSelector((state) => state.userBalance);
  const userAddress = useSelector((state) => state.user.detail.address);
  const isLogged = useIsLogged();

  useEffect(() => {
    async function fetchData() {
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

      setPools(fetchedPools);
    }

    if (isLogged) {
      fetchData();
    }
  }, [isLogged, userAddress]);

  const renderModals = (data) => {
    const token1 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token1));
    const token2 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token2));
    let tokenA;
    if (!token1) {
      tokenA = {
        ...data.token1,
        logo: questionLogo,
        balance:
          numeral(
            userBalance
              .find((balance) => isSameAsset(balance.asset, getAssetDetails(data.token1)))?.balance,
          ).format('0,0.[0000000]') ?? 0,
      };
    } else {
      tokenA = {
        ...token1,
        balance:
          numeral(
            userBalance
              .find((balance) => isSameAsset(balance.asset, getAssetDetails(token1)))?.balance,
          ).format('0,0.[0000000]') ?? 0,
      };
    }
    let tokenB;
    if (!token2) {
      tokenB = {
        ...data.token2,
        logo: questionLogo,
        balance:
          numeral(
            userBalance
              .find((balance) => isSameAsset(balance.asset, getAssetDetails(data.token2)))?.balance,
          ).format('0,0.[0000000]') ?? 0,
      };
    } else {
      tokenB = {
        ...token2,
        balance:
          numeral(
            userBalance
              .find((balance) => isSameAsset(balance.asset, getAssetDetails(token2)))?.balance,
          ).format('0,0.[0000000]') ?? 0,
      };
    }
    const handleDeposit = () => {
      dispatch(
        openModalAction({
          modalProps: {
            title: 'Deposit Liquidity',
            className: 'main',
          },
          content: <DepositLiquidity tokenA={tokenA} tokenB={tokenB} />,
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
          content: <WithdrawLiquidity tokenA={tokenA} tokenB={tokenB} />,
        }),
      );
    };
    return (
      <div className={styles['modal-btns']}>
        <div onClick={handleDeposit}>Deposit</div>
        <div onClick={handleWithdraw}>Withdraw</div>
      </div>
    );
  };

  const renderAssetInfo = (data) => {
    const token1 = getAssetFromLPAsset(data.reserves[0].asset);
    const token2 = getAssetFromLPAsset(data.reserves[1].asset);
    return (
      <div className={styles.tokens}>
        <CurrencyPair
          size={22}
          source={[extractLogo(token1), extractLogo(token2)]}
        />
        <span>
          {token1.code}/{token2.code}
        </span>
      </div>
    );
  };

  const tableHeaders = [
    {
      title: 'Asset',
      dataIndex: 'asset',
      key: 1,
      render: renderAssetInfo,
    },
    // {
    //   title: 'Balance',
    //   dataIndex: 'balance1',
    //   key: 2,
    //   render: (data) => (
    //     <span>
    //       {numeral(data.balance1).format('0,0')}
    //       {data.token1.code}/{numeral(data.balance1 / 5).format('0,0')}
    //       {data.token2.code}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Balance(USD)',
    //   dataIndex: 'balance2',
    //   key: 3,
    //   render: (data) => <span>${numeral(data.balance2).format('0,0')}</span>,
    // },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: 4,
    //   render: renderModals,
    // },
  ];
  const rowLink = (data) => urlMaker.pool.poolId(data.id);

  return (
    <div>
      <CTable
        className={styles.table}
        dataSource={[...pools, ...pools]}
        columns={tableHeaders}
        noDataMessage={NoDataMessage}
        loading={pools === null}
        rowLink={rowLink}
      />
    </div>
  );
}

export default MyPoolData;
