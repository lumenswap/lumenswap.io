import defaultTokens from 'tokens/defaultTokens';
import isSameAsset from 'helpers/isSameAsset';
import CurrencyPair from 'components/CurrencyPair';
import getAssetDetails from 'helpers/getAssetDetails';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from 'actions/modal';
import DepositLiquidity from 'containers/amm/DepositLiquidity';
import WithdrawLiquidity from 'containers/amm/WithdrawLiquidity';
import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import questionLogo from '../../../../public/images/question.png';
import styles from './styles.module.scss';

function NoDataMessage() {
  return <div className={styles['empty-table-container']}><span>You have no pool</span></div>;
}

function PoolData({ userPools }) {
  const userBalance = useSelector((state) => state.userBalance);
  const dispatch = useDispatch();

  const renderModals = (data) => {
    const token1 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token1));
    const token2 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token2));
    let tokenA;
    if (!token1) {
      tokenA = {
        ...data.token1,
        logo: questionLogo,
        balance: numeral(userBalance.find((balance) => isSameAsset(
          balance.asset, getAssetDetails(data.token1),
        ))?.balance).format('0,0.[0000000]')
        ?? 0,
      };
    } else {
      tokenA = {
        ...token1,
        balance: numeral(userBalance.find((balance) => isSameAsset(
          balance.asset, getAssetDetails(token1),
        ))?.balance).format('0,0.[0000000]')
        ?? 0,
      };
    }
    let tokenB;
    if (!token2) {
      tokenB = {
        ...data.token2,
        logo: questionLogo,
        balance: numeral(userBalance.find((balance) => isSameAsset(
          balance.asset, getAssetDetails(data.token2),
        ))?.balance).format('0,0.[0000000]')
        ?? 0,
      };
    } else {
      tokenB = {
        ...token2,
        balance: numeral(userBalance.find((balance) => isSameAsset(
          balance.asset, getAssetDetails(token2),
        ))?.balance).format('0,0.[0000000]')
      ?? 0,
      };
    }
    const handleDeposit = (e) => {
      e.preventDefault();
      dispatch(
        openModalAction({
          modalProps: {
            title: 'Deposit Liquidity',
            className: 'main',
          },
          content: <DepositLiquidity
            tokenA={tokenA}
            tokenB={tokenB}
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
            tokenA={tokenA}
            tokenB={tokenB}
          />,
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

  const renderPoolInfo = (data) => {
    const asset1 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token1));
    const asset2 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), data.token2));

    return (
      <div className={styles.pairs}>
        <CurrencyPair
          size={22}
          source={[asset1?.logo ?? questionLogo, asset2?.logo ?? questionLogo]}
        />
        <span>{`${asset1?.code ?? data.token1.code}/${asset2?.code ?? data.token2.code}`}</span>
      </div>
    );
  };

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
      render: (data) => <span className={styles.balance}>${numeral(data.balance).format('0,0')}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 3,
      render: renderModals,
    },
  ];
  const rowLink = (data) => urlMaker.pool.tokens(data.token1.code, data.token2.code);

  return (
    <div className={styles['table-container']}>
      <CTable
        columns={tableHeader}
        dataSource={userPools}
        noDataMessage={NoDataMessage}
        className={styles.table}
        rowLink={rowLink}
      />
    </div>
  );
}

export default PoolData;
