import classNames from 'classnames';
import GiftIcon from 'assets/images/gift-icon.svg';
import GiftDarkIcon from 'assets/images/gift-dark.svg';
import useCurrentTheme from 'hooks/useCurrentTheme';
import styles from './style.module.scss';

const Status = ({ round }) => {
  const currentTheme = useCurrentTheme();
  let statusClassName = 'live';
  if (round.status.toLowerCase() === 'ended') {
    statusClassName = 'ended';
  } else if (round.status.toLowerCase() === 'not started') {
    statusClassName = 'notStarted';
  }

  return (
    <span className="d-flex align-items-center">
      {round.status.toLowerCase() === 'live' && <img src={currentTheme === 'light' ? GiftIcon : GiftDarkIcon} width={20} height={20} />}
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
