import CTable from 'components/CTable';
import urlMaker from 'helpers/urlMaker';
import CurrencyPair from 'components/CurrencyPair';
import { useDispatch } from 'react-redux';
import { openModalAction } from 'actions/modal';
import WithdrawLiquidity from 'containers/amm/WithdrawLiquidity';
import DepositLiquidity from 'containers/amm/DepositLiquidity';
import getAssetFromLPAsset from 'helpers/getCodeFromLPAsset';
import { extractLogo } from 'helpers/assetUtils';
import Link from 'next/link';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const NoDataMessage = () => (
  <div className={styles['no-data-message-container']}>
    <span>You have no pool</span>
  </div>
);

function MyPoolData({ pools, afterWAD }) {
  const dispatch = useDispatch();

  const renderModals = (data) => {
    const tokenA = getAssetFromLPAsset(data.reserves[0].asset);
    const tokenB = getAssetFromLPAsset(data.reserves[1].asset);

    const handleDeposit = () => {
      dispatch(
        openModalAction({
          modalProps: {
            title: 'Deposit Liquidity',
            className: 'main',
          },
          content: <DepositLiquidity tokenA={tokenA} tokenB={tokenB} afterDeposit={afterWAD} />,
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
          content: <WithdrawLiquidity tokenA={tokenA} tokenB={tokenB} afterWithdraw={afterWAD} />,
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
      <Link href={urlMaker.pool.poolId(data.id)}>
        <a style={{ textDecoration: 'none', color: '#1d1d1d' }}>
          <div className={styles.tokens}>
            <CurrencyPair
              size={22}
              source={[extractLogo(token1), extractLogo(token2)]}
            />
            <span>
              {token1.code}/{token2.code}
            </span>
          </div>
        </a>
      </Link>
    );
  };

  const tableHeaders = [
    {
      title: 'Asset',
      dataIndex: 'asset',
      key: 1,
      render: renderAssetInfo,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 2,
      render: (data) => (
        <span>
          {humanAmount(data.reserves[0].amount, true)} {getAssetFromLPAsset(data.reserves[0].asset).code}{' / '}
          {humanAmount(data.reserves[1].amount, true)}{' '}
          {getAssetFromLPAsset(data.reserves[1].asset).code}
        </span>
      ),
    },
    {
      title: 'Balance (USD)',
      dataIndex: 'balanceUSD',
      key: 3,
      sortFunc: (a, b, order) => (order === 'asc' ? a.balanceUSD - b.balanceUSD : b.balanceUSD - a.balanceUSD),
      render: (data) => (
        <span>
          {data.balanceUSD !== '-' && '$'}{humanAmount(data.balanceUSD, true)}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 4,
      render: renderModals,
    },
  ];

  return (
    <div className={styles['table-container']}>
      <CTable
        className={styles.table}
        dataSource={pools}
        columns={tableHeaders}
        noDataMessage={NoDataMessage}
        loading={pools === null}
      />
    </div>
  );
}

export default MyPoolData;
