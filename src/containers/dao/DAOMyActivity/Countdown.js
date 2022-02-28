import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

const Countdown = ({ endTime }) => {
  const [period, setPeriod] = useState(moment.duration(moment(endTime).diff(moment())));
  const intervalRef = useRef(null);

  useEffect(() => {
    function setCountTime() {
      const countDownTime = moment(endTime).valueOf() - new Date().getTime();
      setPeriod(moment.duration(countDownTime));
    }
    if (!intervalRef.current) {
      intervalRef.current = setInterval(setCountTime, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const fullTime = {
    days: period?.days() > 0 ? `${period.days()}d` : null,
    hours: period?.hours() > 0 ? `${period.hours()}h` : null,
    minutes: period?.minutes() > 0 ? `${period.minutes()}m` : null,
    seconds: `${period?.seconds()}s`,
  };

  return (
    <div>
      {fullTime?.days} {fullTime?.hours} {fullTime?.minutes} {fullTime?.seconds}
    </div>
  );
};

export default Countdown;
