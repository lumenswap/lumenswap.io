import Image from 'next/image';
import Tooltips, { PrimaryTooltip } from 'components/Tooltip';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateTransactionURL, generateAddressURL } from 'helpers/explorerURLGenerator';
import QuestionIcon from 'assets/images/question-icon.png';
import toolTipContent from './toolTipContent';
import styles from './style.module.scss';

const WinnerInfo = ({ round }) => (
  <div className="col-12 px-0 d-flex flex-column">
    <p className={styles['box-title']}>Winner Info</p>
    <div style={{ marginBottom: 15 }} className="d-flex justify-content-between">
      <span className={styles['info-title']}>
        Address
        <Tooltips placement="top" id="price" text={<PrimaryTooltip text={toolTipContent.winnerAddress} />}>
          <span style={{ marginLeft: 2, height: 18 }}>
            <Image src={QuestionIcon} width={16} height={16} />
          </span>
        </Tooltips>
      </span>
      <a style={{ textDecoration: 'none' }} href={generateAddressURL(round.Winner.address)} target="_blank" rel="noreferrer" className={styles.ticketId}>
        {minimizeAddress(round.Winner.address)}
      </a>
    </div>
    <div style={{ marginBottom: 15 }} className="d-flex justify-content-between">
      <span className={styles['info-title']}>
        Ticket ID
        <Tooltips placement="top" id="ticket" text={<PrimaryTooltip text={toolTipContent.winnerTicket} />}>
          <span style={{ marginLeft: 2, height: 18 }}>
            <Image src={QuestionIcon} width={16} height={16} />
          </span>
        </Tooltips>
      </span>
      <a style={{ textDecoration: 'none' }} href={generateTransactionURL(round.Winner.ticketId)} target="_blank" rel="noreferrer" className={styles.ticketId}>
        {minimizeAddress(round.Winner.ticketId, 8)}
      </a>
    </div>
    <div style={{ marginBottom: 5 }} className="d-flex justify-content-between">
      <span className={styles['info-title']}>
        Price Tx
        <Tooltips placement="top" id="participants" text={<PrimaryTooltip text={toolTipContent.winnerTransaction} />}>
          <span style={{ marginLeft: 2, height: 18 }}>
            <Image src={QuestionIcon} width={16} height={16} />
          </span>
        </Tooltips>
      </span>
      <a style={{ textDecoration: 'none' }} href={generateTransactionURL(round.Winner.transactionId)} target="_blank" rel="noreferrer" className={styles.ticketId}>
        {minimizeAddress(round.Winner.transactionId, 8)}
      </a>
    </div>
  </div>
);

export default WinnerInfo;
