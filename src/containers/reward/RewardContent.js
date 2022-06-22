import CTable from 'components/CTable';
import CStatistics, { Info } from 'components/CStatistics';
import moment from 'moment';
import { generateTransactionURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import Loading from 'components/Loading';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAddressReward, fetchAddressRewardStats } from 'api/rewards';
import { isSameAsset, getAssetDetails } from 'helpers/asset';
import humanizeAmount from 'helpers/humanizeAmount';
import BN from 'helpers/BN';
import useDefaultTokens from 'hooks/useDefaultTokens';
import { extractTokenFromCode } from 'helpers/defaultTokenUtils';
import styles from './styles.module.scss';

function rewardAmountHumanize(amount) {
  return humanizeAmount(new BN(amount ?? '0').div(10 ** 7).toFixed(7));
}

const RewardContent = () => {
  const userAdress = useSelector((state) => state.user.detail.address);
  const [rewardStats, setRewardStats] = useState(null);
  const [addressReward, setAddressReward] = useState(null);
  const userBalances = useSelector((state) => state.userBalance);
  const defaultTokens = useDefaultTokens();
  const foundLSP = userBalances
    .find((i) => isSameAsset(getAssetDetails(extractTokenFromCode('LSP', defaultTokens)), getAssetDetails(i.asset)));

  useEffect(() => {
    function loadingUserData() {
      fetchAddressRewardStats(userAdress)
        .then((res) => setRewardStats(res.data)).catch((err) => console.log(err));
    }

    function loadAddressReward() {
      fetchAddressReward(userAdress)
        .then((res) => setAddressReward(res.data)).catch((err) => console.log(err));
    }

    loadingUserData();
    loadAddressReward();
  }, [userAdress]);

  const tableHeaders = [
    {
      title: 'Tx',
      dataIndex: 'txHash',
      key: '1',
      render: (data) => (
        <a
          href={generateTransactionURL(data.txHash)}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#0e41f5', textDecoration: 'none' }}
        >{minimizeAddress(data.txHash, 8)}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'txDate',
      key: '2',
      render: (data) => <span>{moment(data.txDate * 1000).fromNow()}</span>,
    },
    { title: 'Type', dataIndex: 'type', key: '3' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '4',
      render: (data) => <span>{rewardAmountHumanize(data.amount)} LSP</span>,
    },
  ];

  const statisticBlocks = [
    {
      title: 'Wallet balance',
      tooltip: 'This shows your wallet’s LSP balance.',
      content: <Info text="LSP" number={humanizeAmount(foundLSP ? foundLSP.balance : '0')} />,
    },
    {
      title: 'Holder reward earned',
      tooltip: 'This shows your earned rewards from the holder program.',
      content: <Info text="LSP" number={rewardAmountHumanize(rewardStats?.holder?.total)} />,
    },
    {
      title: 'Trade reward earned',
      tooltip: 'This shows your earned rewards from the trader program.',
      content: <Info text="LSP" number={rewardAmountHumanize(rewardStats?.trader?.total)} />,
    },
    {
      title: 'LP reward earned',
      tooltip: 'This shows your earned reward from the LP program.',
      content: <Info text="LSP" number={rewardAmountHumanize(rewardStats?.lp?.total)} />,
    },
  ];

  return (
    <div>
      <div className={styles['info-LSP']}>
        <CStatistics blocks={statisticBlocks} />
      </div>
      <div className={styles['table-title']}>Last activity</div>
      <div className={styles['table-container']}>
        {rewardStats === null || addressReward === null ? (
          <div className={styles['loading-container']}>
            <Loading size={48} />
          </div>
        ) : (
          <CTable
            columns={tableHeaders}
            dataSource={addressReward?.data}
            noDataMessage="There is no reward activity here"
          />
        )}
      </div>
    </div>
  );
};

export default RewardContent;
