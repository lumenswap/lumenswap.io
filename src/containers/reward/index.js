import Header from 'components/Header';
import InfoOfLSP from 'components/InfoOfLSP';
import Image from 'next/image';
import CTable from 'components/CTable';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/Button';
import { openConnectModal } from 'actions/modal';
import styles from './styles.module.scss';
import connectIcon from './SVG-icons/connectIcon.svg';

const Reward = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.logged);
  const walletBalance = 1000;
  const holderReward = 12;
  const tradeReward = 1000;
  const tableHeaders = [
    {
      title: 'Tx',
      key: '1',
      render: (value, url) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
        >{value}
        </a>
      ),
    },
    { title: 'Date', key: '2' },
    { title: 'Type', key: '3' },
    { title: 'Amount', key: '4' },
  ];
  const tableRows = [
    {
      Tx: '2jd0n8le…w98ue4ed',
      Url: 'https://www.google.com',
      Date: '1 min ago',
      Type: 'Holder',
      Amount: '100',
      key: '1',
    },
    {
      Tx: '2jd0n8le…w98ue4ed',
      Url: 'https://www.example.com',
      Date: '1 min ago',
      Type: 'Holder',
      Amount: '100',
      key: '1',
    },
    {
      Tx: '2jd0n8le…w98ue4ed',
      Url: 'https://www.example2.com',
      Date: '1 min ago',
      Type: 'Holder',
      Amount: '100',
      key: '1',
    },
    {
      Tx: '2jd0n8le…w98ue4ed',
      Url: 'https://www.example3.com',
      Date: '1 min ago',
      Type: 'Holder',
      Amount: '100',
      key: '1',
    },
    {
      Tx: '2jd0n8le…w98ue4ed',
      Url: 'https://www.example4.com',
      Date: '1 min ago',
      Type: 'Holder',
      Amount: '100',
      key: '1',
    },

  ];
  return (
    <>
      <div className="container-fluid">
        <Header />
      </div>

      <div className={styles.main}>
        <div className={styles['page-title']}>Dashboard</div>
        {isLogged ? (
          <div>
            <div className={styles['info-LSP']}>
              <InfoOfLSP
                walletBalance={walletBalance}
                holderReward={holderReward}
                tradeReward={tradeReward}
              />
            </div>
            <div className={styles['table-title']}>Last activity</div>
            <CTable columns={tableHeaders} dataSource={tableRows} />
          </div>
        )
          : (
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
          )}

      </div>

    </>
  );
};

export default Reward;
