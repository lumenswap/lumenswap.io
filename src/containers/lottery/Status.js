import Image from 'next/image';
import classNames from 'classnames';
import GiftIcon from 'assets/images/gift-icon.svg';
import styles from './style.module.scss';

const Status = ({ round, gift }) => (
  <span className="d-flex align-items-center">
    {gift && <Image src={GiftIcon} width={16} height={16} />}
    <div
      style={{ marginLeft: 10 }}
      className={classNames(
        styles.status,
        round.status.toLowerCase() === 'live' ? styles.live : styles.ended,
      )}
    >
      <span className={styles.dot} />
      {round.status}
    </div>
  </span>
);

export default Status;
