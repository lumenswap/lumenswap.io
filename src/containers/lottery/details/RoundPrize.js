import Image from 'next/image';
import Status from '../Status';
import styles from './style.module.scss';

const RoundPrize = ({ round }) => (
  <div className={styles.roundItem}>
    <div className="d-flex justify-content-end align-items-center">
      <Status round={round} />
    </div>
    <div className={styles.roundImage}>
      <Image src={`/images/${round.image}`} width={410} height={246} objectFit="contain" />
    </div>
  </div>
);

export default RoundPrize;
