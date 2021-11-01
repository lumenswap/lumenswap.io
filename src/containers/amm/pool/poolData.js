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
import sevenDigit from 'helpers/sevenDigit';
import questionLogo from '../../../../public/images/question.png';
import styles from './styles.module.scss';

function NoDataMessage() {
  return <div className={styles['empty-table-container']}><span>You have no pool</span></div>;
}

function PoolData({ userPools }) {
  const userBalance = useSelector((state) => state.userBalance);
  const dispatch = useDispatch();

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

    const token1 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), refinedA));
    const token2 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), refinedB));

    let tokenA;
    if (!token1) {
      tokenA = {
        code: a1[0],
        issuer: a1[0],
        logo: questionLogo,
        balance: numeral(userBalance.find((balance) => isSameAsset(
          balance.asset, refinedA,
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
        code: a2[0],
        issuer: a2[1],
        logo: questionLogo,
        balance: numeral(userBalance.find((balance) => isSameAsset(
          balance.asset, refinedB,
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
    const a1 = data.reserves[0].asset.split(':');
    const a2 = data.reserves[1].asset.split(':');

    const asset1 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), getAssetDetails({
      code: a1[0],
      issuer: a1[1],
    })));

    const asset2 = defaultTokens.find((i) => isSameAsset(getAssetDetails(i), getAssetDetails({
      code: a2[0],
      issuer: a2[1],
    })));

    return (
      <div className={styles.pairs}>
        <CurrencyPair
          size={22}
          source={[asset1?.logo ?? questionLogo, asset2?.logo ?? questionLogo]}
        />
        <span>{`${asset1?.code ?? a1[0]}/${asset2?.code ?? a2[0]}`}</span>
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
      render: (data) => (
        <span className={styles.balance}>
          {numeral(sevenDigit(data.reserves[0].amount)).format('0,0.[0000000]')} {data.reserves[0].asset.split(':')[0] === 'native' ? 'XLM' : data.reserves[0].asset.split(':')[0]}
          {' / '}
          {numeral(sevenDigit(data.reserves[1].amount)).format('0,0.[0000000]')} {data.reserves[1].asset.split(':')[0] === 'native' ? 'XLM' : data.reserves[1].asset.split(':')[0]}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: '4',
      render: renderModals,
    },
  ];

  const rowLink = (data) => urlMaker.pool.poolId(data.id);

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
