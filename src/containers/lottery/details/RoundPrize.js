import Image from 'next/image';
import GiftIcon from 'assets/images/gift.svg';
import Status from '../Status';
import styles from './style.module.scss';

const RoundPrize = ({ round }) => (
  <div className={styles.roundItem}>
    <div className={styles['description-overlay']}>
      <p className="position-relative">
        <span className={styles['gift-icon']}>
          <Image src={GiftIcon} width={30} height={32} />
        </span>
        {round?.prizeDescription}
      </p>
    </div>
    <div className="d-flex justify-content-end align-items-center">
      <Status round={round} />
    </div>
    <div className={styles.roundImage}>
      {round?.prizeImage && <Image src={round?.prizeImage} width={410} height={246} objectFit="contain" />}
    </div>
  </div>
);

export default RoundPrize;
