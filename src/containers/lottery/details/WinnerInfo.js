import minimizeAddress from 'helpers/minimizeAddress';
import { generateTransactionURL, generateAddressURL } from 'helpers/explorerURLGenerator';
import InfoBox from 'components/InfoBox';
import classNames from 'classnames';
import styles from './style.module.scss';

const WinnerInfo = ({ round }) => {
  const winnerInfo = [
    {
      title: 'Address',
      tooltip: 'This shows winner address.',
      render: (info) => (
        <a
          className={classNames(styles['ticket-id'], styles.infos)}
          style={{ textDecoration: 'none' }}
          href={generateAddressURL(info.Winner.address)}
          target="_blank"
          rel="noreferrer"
        >
          {minimizeAddress(info.Winner.address)}
        </a>
      ),
    },
    {
      title: 'Ticket ID',
      tooltip: 'This shows ticket id with which the winner has won the lottery.',
      render: (info) => (
        <a
          className={classNames(styles['ticket-id'], styles.infos)}
          style={{ textDecoration: 'none' }}
          href={generateTransactionURL(info.Winner.ticketId)}
          target="_blank"
          rel="noreferrer"
        >
          {minimizeAddress(info.Winner.ticketId, 8)}
        </a>
      ),
    },
    {
      title: 'Price Tx',
      tooltip: 'This shows the transaction hash in which the winner has received the prize.',
      render: (info) => (
        <a
          className={classNames(styles['ticket-id'], styles.infos)}
          style={{ textDecoration: 'none' }}
          href={generateTransactionURL(info.Winner.transactionId)}
          target="_blank"
          rel="noreferrer"
        >
          {minimizeAddress(info.Winner.transactionId, 8)}
        </a>
      ),
    },
  ];

  return (
    <InfoBox
      data={round}
      rows={winnerInfo}
      title="Winner Info"
    />
  );
};

export default WinnerInfo;
