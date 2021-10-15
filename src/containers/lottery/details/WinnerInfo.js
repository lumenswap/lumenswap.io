import Image from 'next/image';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import minimizeAddress from 'helpers/minimizeAddress';
import QuestionIcon from 'assets/images/question-icon.png';
import toolTipContent from './toolTipContent';
import styles from './style.module.scss';

const WinnerInfo = ({ round }) => (
  <div className="col-12 d-flex flex-column">
    <p className={styles['box-title']}>Winner Info</p>
    <div style={{ marginBottom: 15 }} className="d-flex justify-content-between">
      <span className={styles['info-title']}>
        Address
        <Tooltips placement="top" id="price" text={<PrimaryTooltip text={toolTipContent.tooltip.ticket} />}>
          <span style={{ marginLeft: 2, height: 18 }}>
            <Image src={QuestionIcon} width={16} height={16} />
          </span>
        </Tooltips>
      </span>
      <span className={styles.ticketId}>{minimizeAddress(round.winner.address)}</span>
    </div>
    <div style={{ marginBottom: 15 }} className="d-flex justify-content-between">
      <span className={styles['info-title']}>
        Ticket ID
        <Tooltips placement="top" id="ticket" text={<PrimaryTooltip text={toolTipContent.tooltip.ticket} />}>
          <span style={{ marginLeft: 2, height: 18 }}>
            <Image src={QuestionIcon} width={16} height={16} />
          </span>
        </Tooltips>
      </span>
      <span className={styles.ticketId}>{minimizeAddress(round.winner.transactionId, 8)}</span>
    </div>
    <div style={{ marginBottom: 5 }} className="d-flex justify-content-between">
      <span className={styles['info-title']}>
        Price Tx
        <Tooltips placement="top" id="participants" text={<PrimaryTooltip text={toolTipContent.tooltip.ticket} />}>
          <span style={{ marginLeft: 2, height: 18 }}>
            <Image src={QuestionIcon} width={16} height={16} />
          </span>
        </Tooltips>
      </span>
      <span className={styles.ticketId}>{minimizeAddress(round.winner.priceTx, 8)}</span>
    </div>
  </div>
);

export default WinnerInfo;
