import numeral from 'numeral';
import classNames from 'classnames';
import Image from 'next/image';
import ArrowIcon from 'assets/images/arrow-right-icon.png';
import moment from 'moment';
import { useState } from 'react';
import InfoBox from 'components/InfoBox';
import WinnerInfo from './WinnerInfo';
import styles from './style.module.scss';

const RoundInfo = ({ round }) => {
  const [endPeriod, setEndPeriod] = useState(true);

  const roundInfo = [
    {
      title: 'Period',
      render: (info) => (
        <span className={styles.infos}>
          {endPeriod ? moment(info.startDate).format('D MMM Y') : `${info.startLedger} Ledger`}
          <span style={{ marginLeft: 6, marginRight: 6 }}>
            <Image src={ArrowIcon} width={12} height={12} />
          </span>
          <span className="d-inline-flex align-items-center">
            {endPeriod ? moment(info.endDate).format('D MMM Y') : `${info.endLedger} Ledger`}
            <span
              className="icon-arrow-repeat"
              style={{ cursor: 'pointer', marginLeft: 3, color: '#8d8f9a' }}
              onClick={() => setEndPeriod(!endPeriod)}
            />
          </span>
        </span>
      ),
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
          <div style={{ padding: '15px 14px' }} className={classNames('col-12 d-flex flex-column mt-auto')}>
            <WinnerInfo round={round} />
          </div>
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
