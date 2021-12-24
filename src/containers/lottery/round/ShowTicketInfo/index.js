import { generateAddressURL, generateTransactionURL } from 'helpers/explorerURLGenerator';
import ExtrernalBlueArrow from 'assets/images/ExternalBlueArrow';
import moment from 'moment';
import styles from './styles.module.scss';

const BetweenBox = () => (
  <div style={{ position: 'relative' }}>
    <div className={styles['between-box-border']} />
    <div className={styles['between-box']}>
      <div className={styles['between-box-left']} />
      <div className={styles['between-box-right']} />
    </div>
  </div>
);

function ShowTicketInfo({ data }) {
  return (
    <div className={styles.main}>
      <div className={styles['ticket-id-container']}>
        <span className={styles['info-title']}>Ticket ID</span>
        <div className={styles['info-container']}>
          <span className={styles.info}>
            {data.transactionId.toUpperCase()}
            <a
              href={generateTransactionURL(data.transactionId)}
              target="_blank"
              rel="noreferrer"
              className={styles['arrow-icon']}
            >
              <ExtrernalBlueArrow />
            </a>
          </span>
        </div>
      </div>
      <BetweenBox />
      <div className={styles['address-container']}>
        <span className={styles['info-title']}>Address</span>
        <span className={styles.info}>
          {data.address}
          <a
            href={generateAddressURL(data.address)}
            target="_blank"
            rel="noreferrer"
            className={styles['arrow-icon']}
          >
            <ExtrernalBlueArrow />
          </a>
        </span>
      </div>
      <BetweenBox />
      <div className={styles['date-container']}>
        <span className={styles['info-title']}>Created date</span>
        <span className={styles['info-date']}>
          {moment(data.ticketDate).format('DD MMM YYYY')}
        </span>
      </div>
    </div>
  );
}

export default ShowTicketInfo;
