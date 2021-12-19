// import Image from 'next/image';
import numeral from 'numeral';
import Status from '../Status';
import styles from './style.module.scss';

const RoundItem = ({ round }) => (
  <div className={styles['round-item-main']}>
    <div className={styles.roundItem}>
      <div className="d-flex justify-content-between align-items-center">
        <span className={styles.title}>Round #{round.number}</span>
        <Status round={round} />
      </div>
      <div className={styles.roundImage}>
        {round?.prizeImage && <img src={round?.prizeImage} style={{ width: 330, height: 180, objectFit: 'contain' }} />}
      </div>
    </div>
    <div className={styles['round-item-info']}>
      <div className={styles['round-item-info-section']}>
        <div className={styles['round-item-info-texts']}>
          <span className={styles['round-item-info-texts-number']}>{numeral(round.participantCount).format('0,0')}</span>
          <span className={styles['round-item-info-texts-text']}>Participants</span>
        </div>
      </div>
      <div className={styles['round-item-info-section']}>
        <div className={styles['round-item-info-texts']}>
          <span className={styles['round-item-info-texts-number']}>{numeral(round.ticketCount).format('0,0')}</span>
          <span className={styles['round-item-info-texts-text']}>Tickets</span>
        </div>
      </div>
    </div>
  </div>
);

export default RoundItem;
