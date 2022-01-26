import classNames from 'classnames';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import ArrowRight from 'assets/images/arrowRight';
import styles from './styles.module.scss';

export default function CountdownComponent({ data }) {
  const [showCountdown, setShowCountdown] = useState(false);
  const [period, setPeriod] = useState(null);
  const interValRef = useRef(null);

  useEffect(() => {
    function setCountTime() {
      const countDownTime = moment(data.endDate).valueOf() - new Date().getTime();
      setPeriod(moment.duration(countDownTime));
    }
    if (!interValRef.current) {
      interValRef.current = setInterval(setCountTime, 1000);
    }

    return () => {
      clearInterval(interValRef.current);
    };
  }, []);

  const handleShowCountdown = () => {
    setShowCountdown((prev) => !prev);
  };

  if (showCountdown) {
    const fullTime = {
      days: period?.days() > 0 ? `${period.days()}d` : null,
      hours: period?.hours() > 0 ? `${period.hours()}h` : null,
      minutes: period?.minutes() > 0 ? `${period.minutes()}m` : null,
      seconds: `${period?.seconds()}s`,
    };

    return (
      <div className={styles.period}>
        {data.status === 'Live'
          ? (
            <div className={styles.period}>
              {fullTime?.days} {fullTime?.hours} {fullTime?.minutes} {fullTime?.seconds}
            </div>
          ) : data.status}
        <span
          className={classNames('icon-arrow-repeat', styles['cricle-icon'])}
          onClick={handleShowCountdown}
        />
      </div>
    );
  }

  return (
    <div className={styles.period}>
      {moment(data.startDate).format('D MMM Y')}
      <div className={styles['arrow-icon']}><ArrowRight /></div>
      {moment(data.endDate).format('D MMM Y')}
      <span
        className={classNames('icon-arrow-repeat', styles['cricle-icon'])}
        onClick={handleShowCountdown}
      />
    </div>
  );
}
