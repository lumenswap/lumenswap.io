import Link from 'next/link';
import RoundItem from './RoundItem';
import styles from './style.module.scss';

const RoundData = ({ rounds }) => (
  <div className={styles.roundsList}>
    {rounds.map((round) => (
      <Link href="#" passHref>
        <a className="text-decoration-none">
          <RoundItem round={round} />
        </a>
      </Link>
    ))}
  </div>
);

export default RoundData;
