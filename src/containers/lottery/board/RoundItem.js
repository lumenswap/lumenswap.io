import Image from 'next/image';
import Status from '../Status';
import styles from './style.module.scss';

const RoundItem = ({ round }) => (
  <div className={styles.roundItem}>
    <div className="d-flex justify-content-between align-items-center">
      <span className={styles.title}>{round.title}</span>
      <Status round={round} gift />
    </div>
    <div className={styles.roundImage}>
      <Image src={`/images/${round.image}`} width={330} height={180} objectFit="contain" />
    </div>
  </div>
);

export default RoundItem;
