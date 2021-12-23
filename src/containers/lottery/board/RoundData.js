import classNames from 'classnames';
import urlMaker from 'helpers/urlMaker';
import Link from 'next/link';
import RoundItem from './RoundItem';
import styles from './style.module.scss';

const RoundData = ({ rounds }) => (
  <div className={classNames(styles.roundsList, 'row')}>
    {rounds.map((round, i) => (
      <div className="col-12 col-lg-6">
        <Link key={i} href={urlMaker.lottery.round.root(round.number)} passHref>
          <a className="text-decoration-none">
            <RoundItem round={round} />
          </a>
        </Link>
      </div>
    ))}
  </div>
);

export default RoundData;
