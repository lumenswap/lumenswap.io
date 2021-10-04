import Image from 'next/image';
import classNames from 'classnames';

import GiftIcon from 'assets/images/gift-icon.svg';
import styles from './style.module.scss';

const RoundItem = ({ round }) => (
  <div className={styles.roundItem}>
    <div className="d-flex justify-content-between align-items-center">
      <span className={styles.title}>{round.title}</span>
      <span className="d-flex align-items-center">
        <Image src={GiftIcon} width={16} height={16} />
        <div
          style={{ marginLeft: 10 }}
          className={classNames(
            styles.status,
            round.status === 'Live' ? styles.live : styles.ended,
          )}
        >
          <span className={styles.dot} />
          {round.status}
        </div>
      </span>
    </div>
    <div className={styles.roundImage}>
      <Image src={`/images/${round.image}`} width={330} height={180} objectFit="contain" />
    </div>
  </div>
);

export default RoundItem;
