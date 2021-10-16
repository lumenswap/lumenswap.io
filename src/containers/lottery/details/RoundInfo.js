import classNames from 'classnames';
import numeral from 'numeral';
import Image from 'next/image';
import ArrowIcon from 'assets/images/arrow-right-icon.png';
import QuestionIcon from 'assets/images/question-icon.png';
import moment from 'moment';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import { useState } from 'react';
import WinnerInfo from './WinnerInfo';
import toolTipContent from './toolTipContent';
import styles from './style.module.scss';

const RoundInfo = ({ round }) => {
  const [endPeriod, setEndPeriod] = useState(true);

  return (
    <div style={{ height: '100%' }} className={classNames('row', styles['round-info'])}>
      <div className="col-12 d-flex flex-column">
        <p className={styles['box-title']}>Round Info</p>
        <div style={{ marginBottom: 15 }} className="d-flex justify-content-between">
          <span className={styles['info-title']}>Period</span>
          <span>{moment(round.startDate).format('D MMM Y')}
            <span style={{ marginLeft: 6, marginRight: 6 }}>
              <Image src={ArrowIcon} width={12} height={12} />
            </span>
            <span className="d-inline-flex align-items-center">
              {endPeriod ? moment(round.endDate).format('D MMM Y') : round.endLedger}
              <span
                className="icon-arrow-repeat"
                style={{ cursor: 'pointer', marginLeft: 3, color: '#8d8f9a' }}
                onClick={() => setEndPeriod(!endPeriod)}
              />
            </span>
          </span>
        </div>
        <div style={{ marginBottom: 15 }} className="d-flex justify-content-between">
          <span className={styles['info-title']}>
            Ticket
            <Tooltips placement="top" id="ticket" text={<PrimaryTooltip text={toolTipContent.tooltip.ticket} />}>
              <span style={{ marginLeft: 2, height: 18 }}>
                <Image src={QuestionIcon} width={16} height={16} />
              </span>
            </Tooltips>
          </span>
          <span>{numeral(round.ticketCount).format('0,0')}</span>
        </div>
        <div className={classNames(styles['participants-row'], 'd-flex justify-content-between')}>
          <span className={styles['info-title']}>
            Participants
            <Tooltips placement="top" id="participants" text={<PrimaryTooltip text={toolTipContent.tooltip.ticket} />}>
              <span style={{ marginLeft: 2, height: 18 }}>
                <Image src={QuestionIcon} width={16} height={16} />
              </span>
            </Tooltips>
          </span>
          <span>{numeral(round.participantCount).format('0,0')}</span>
        </div>
      </div>
      {round.winner
        ? (
          <div style={{ padding: '15px 14px' }} className={classNames('col-12 d-flex flex-column mt-auto')}>
            <WinnerInfo round={round} />
          </div>
        ) : (
          <div className={classNames('col-12 d-flex flex-column mt-auto', styles['winner-info'])}>
            <p style={{ margin: 4 }}>Winner Info</p>
            <p>The winner will be determined in this Ledger Number:</p>
            <div>{round?.endLedger}</div>
          </div>
        )}
    </div>
  );
};

export default RoundInfo;
