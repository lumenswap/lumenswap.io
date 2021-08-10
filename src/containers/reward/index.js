import Header from 'components/Header';
import Image from 'next/image';
import Head from 'next/head';
import CTable from 'components/CTable';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/Button';
import { openConnectModal } from 'actions/modal';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import { generateTransactionURL } from 'helpers/generateTransactionURL';
import numeral from 'numeral';
import moment from 'moment';
import CStatistics, { Info } from 'components/CStatistics';
import styles from './styles.module.scss';
import { fetchAddressReward } from './rewards';
import connectIcon from '../../assets/images/connectIcon.svg';

const RewardPage = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.logged);
  const userAdress = useSelector((state) => state.user.detail.address);
  const [userData, setUserData] = useState(null);
  let statisticBlocks;
  if (userData === null) {
    statisticBlocks = null;
  } else {
    statisticBlocks = [
      {
        title: 'Wallet balance',
        tooltip: 'tooltip ',
        content: <Info text="LSP" number={userData.stats.walletBalance} />,
        width: '262px',
      },
      {
        title: 'Holder reward earned',
        tooltip: 'tooltip ',
        content: <Info text="LSP" number={userData.stats.holderReward} />,
        width: '351px',
        contentMarginLeft: '47px',
      },
      {
        title: 'Trade reward earned',
        tooltip: 'tooltip ',
        content: <Info text="LSP" number={userData.stats.tradeReward} />,
        contentMarginLeft: '47px',
      },
    ];
  }
  const tableHeaders = [
    {
      title: 'Tx',
      dataIndex: 'tx',
      key: '1',
      render: (data) => (
        <a
          href={generateTransactionURL(data.tx)}
          target="_blank"
          rel="noreferrer"
        >{data.tx}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '2',
      render: (data) => <span>{moment(data.date).fromNow()}</span>,
    },
    { title: 'Type', dataIndex: 'type', key: '3' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '4',
      render: (data) => <span>{numeral(data.amount).format('0,0.[0000]')}</span>,
    },
  ];

  const UserData = () => (
    <div>
      <div className={styles['info-LSP']}>
        <CStatistics blocks={statisticBlocks} />
      </div>
      <div className={styles['table-title']}>Last activity</div>
      <CTable columns={tableHeaders} dataSource={userData.lastActivity} />
    </div>
  );
  const Login = () => (
    <div className="row justify-content-center">
      <div className="col-auto">
        <div className={styles['connect-container']}>
          <div className={styles['div-icon']}>
            <Image width="40" height="34" src={connectIcon} alt="icon" />
          </div>
          <div className={styles['connect-text']}>
            To see the reward statistics, please connect your account.
          </div>
          <Button
            variant="secondary"
            content="Connect Wallet"
            fontWeight="500"
            className={styles['connect-btn']}
            onClick={() => {
              dispatch(openConnectModal());
            }}
          />
        </div>
      </div>
    </div>
  );
  function loadingUserData() {
    fetchAddressReward(userAdress)
      .then((res) => setUserData(res)).catch((err) => console.log(err));
  }
  useEffect(() => {
    if (isLogged) {
      loadingUserData();
    }
  }, [userAdress, isLogged]);

  if (isLogged && userData === null) {
    return <div className={styles['loading-container']}><Loading size={21} /></div>;
  }

  return (
    <>
      <div className="container-fluid">
        <Head>
          <title>Lumenswap | Reward</title>
        </Head>
        <Header />
      </div>

      <div className={styles.main}>
        <div className={styles['page-title']}>Dashboard</div>
        {isLogged ? <UserData /> : <Login /> }
      </div>

    </>
  );
};

export default RewardPage;
