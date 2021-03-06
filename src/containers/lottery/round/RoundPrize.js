import GiftIcon from 'assets/images/gift.svg';
import moment from 'moment';
import Status from '../Status';
import styles from './style.module.scss';

const RoundPrize = ({ round }) => (
  <div className={styles.roundItem}>
    <div className={styles['description-overlay']}>
      <p className="position-relative">
        <span className={styles['gift-icon']}>
          <img src={GiftIcon} width={30} height={32} />
        </span>
        {round.status === 'Not started'
          ? `The round information will be released on ${moment.utc(round.startDate).format('MMMM DD')}.`
          : round?.prizeDescription}

        {round.status !== 'Not started' && (
          <>
            {' '}The cost of buying a ticket is 1 LSP and the winner will be selected{' '}
            at the {round.endLedger} Ledger,{' '}
            <a
              style={{ textDecoration: 'none', color: 'white' }}
              href={round.mediumLink}
              target="_blank"
              rel="noreferrer"
            >
              Read this article to learn more about this round.
            </a>
          </>
        )}
      </p>
    </div>
    <div className="d-flex justify-content-end align-items-center">
      <Status round={round} />
    </div>
    <div className={styles.roundImage}>
      {round?.prizeImage && <img src={round?.prizeImage} style={{ width: '100%', height: 246, objectFit: 'contain' }} />}
    </div>
  </div>
);

export default RoundPrize;
