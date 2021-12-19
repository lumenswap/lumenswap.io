import Image from 'next/image';
import classNames from 'classnames';
import GiftIcon from 'assets/images/gift-icon.svg';
import styles from './style.module.scss';

const Status = ({ round }) => {
  let statusClassName = 'live';
  if (round.status.toLowerCase() === 'ended') {
    statusClassName = 'ended';
  } else if (round.status.toLowerCase() === 'not started') {
    statusClassName = 'notStarted';
  }

  return (
    <span className="d-flex align-items-center">
      {round.status.toLowerCase() === 'live' && <Image src={GiftIcon} width={20} height={20} />}
      <div
        style={{ marginLeft: 14 }}
        className={classNames(
          styles.status,
          styles[statusClassName],
        )}
      >
        <span className={styles.dot} />
        {round.status}
      </div>
    </span>
  );
};

export default Status;
