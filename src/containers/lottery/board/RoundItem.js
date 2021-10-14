import Image from 'next/image';
import Status from '../Status';
import styles from './style.module.scss';

const RoundItem = ({ round }) => (
  <div className={styles.roundItem}>
    <div className="d-flex justify-content-between align-items-center">
      <span className={styles.title}>Round #{round.number}</span>
      <Status round={round} gift />
    </div>
    <div className={styles.roundImage}>
      <Image src={`/${round?.prizeImage || 'tesla.jpg'}`} width={330} height={180} objectFit="contain" />
    </div>
  </div>
);

export default RoundItem;
