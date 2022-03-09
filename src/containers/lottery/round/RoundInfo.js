import numeral from 'numeral';
import ArrowIcon from 'assets/images/arrow-right-icon.png';
import moment from 'moment';
import { useState } from 'react';
import InfoBox from 'components/InfoBox';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateTransactionURL, generateAddressURL } from 'helpers/explorerURLGenerator';
import styles from './style.module.scss';

const RoundInfo = ({ round }) => {
  const [endPeriod, setEndPeriod] = useState(true);

  const PeriodInfo = (info) => (
    <span className={styles.infos}>
      {endPeriod ? moment(info.startDate).format('D MMM Y') : `${+info.startLedger + 1} Ledger`}
      <span className={styles['arrow-icon']}>
        <img src={ArrowIcon} width={12} height={12} />
      </span>
      <span className="d-inline-flex align-items-center">
        {endPeriod ? moment(info.endDate).format('D MMM Y') : `${+info.endLedger - 1} Ledger`}
        <span
          className="icon-arrow-repeat"
          style={{ cursor: 'pointer', marginLeft: 3, color: '#8d8f9a' }}
          onClick={() => setEndPeriod(!endPeriod)}
        />
      </span>
    </span>
  );

  const roundInfo = [
    {
      title: 'Period',
      render: PeriodInfo,
    },
    {
      title: 'Ticket',
      tooltip: 'This shows the number of purchased tickets for this round.',
      render: (info) => (
        <span className={styles.infos}>{numeral(info.ticketCount).format('0,0')}</span>
      ),
    },
    {
      title: 'Participants',
      tooltip: 'This shows the number of addresses that have purchased tickets and participated in this',
      render: (info) => (
        <span className={styles.infos}>{numeral(info.participantCount).format('0,0')}</span>
      ),
    },
  ];

  const winnerInfo = [
    {
      title: 'Address',
      tooltip: 'This shows winner address.',
      externalLink: {
        title: `${minimizeAddress(round?.Winner?.address)}`,
        url: generateAddressURL(round?.Winner?.address),
      },
    },
    {
      title: 'Ticket ID',
      tooltip: 'This shows ticket id with which the winner has won the lottery.',
      externalLink: {
        title: `${minimizeAddress(round?.Winner?.ticketId, 8)}`,
        url: generateTransactionURL(round?.Winner?.ticketId),
      },
    },
    {
      title: 'Prize Tx',
      tooltip: 'This shows the transaction hash in which the winner has received the prize.',
      externalLink: {
        title: `${minimizeAddress(round?.Winner?.transactionId, 8)}`,
        url: generateTransactionURL(round?.Winner?.transactionId),
      },
    },
  ];

  return (
    <div>
      <InfoBox
        title="Round Info"
        rows={roundInfo}
        data={round}
        className={styles['first-info-box']}
      />
      {round.winner
        ? (
          <InfoBox
            data={round}
            rows={winnerInfo}
            title="Winner Info"
          />
        ) : (
          <div className={styles['winner-info-about']}>
            <div className={styles['winner-info-about-items']}>
              <p style={{ margin: 4 }}>Winner Info</p>
              <p>The winner will be determined in this<br /> Ledger Number:</p>
              <span>{round?.endLedger}</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default RoundInfo;
