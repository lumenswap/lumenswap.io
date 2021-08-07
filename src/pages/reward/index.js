import Header from 'components/Header';
import InfoOfLSP from 'components/InfoOfLSP';
import CTable from 'components/CTable';
import styles from './styles.module.scss';

function Reward() {
  const walletBalance = 1000;
  const holderReward = 12;
  const tradeReward = 1000;
  const tableHeaders = [
    { title: 'Tx', key: '1' },
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
      Url: 'https://www.google.com',
      Date: '1 min ago',
      Type: 'Holder',
      Amount: '100',
      key: '1',
    },
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
      Url: 'https://www.google.com',
      Date: '1 min ago',
      Type: 'Holder',
      Amount: '100',
      key: '1',
    },
    {
      Tx: '2jd0n8le…w98ue4ed',
      Url: 'https://www.google.com',
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

    </>
  );
}

export default Reward;
