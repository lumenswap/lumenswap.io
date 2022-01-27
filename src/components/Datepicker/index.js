import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import CalenderIcon from 'assets/images/calender';

import styles from './styles.module.scss';

const CustomInput = forwardRef(({ value, onClick },
  ref) => (
    <div className={styles.select} ref={ref} onClick={onClick}>
      {moment(value).format('DD MMM YYYY')}
      <CalenderIcon />
    </div>
));

const Datepicker = ({
  startDate, valueName, setValue, trigger,
}) => {
  const [date, setDate] = useState(startDate);

  const onChangeDate = (selectedDate) => {
    setDate(selectedDate);
    console.warn(selectedDate);
    trigger();
  };

  useEffect(() => {
    setValue(valueName, date || startDate);
  }, [date]);

  return (
    <DatePicker
      selected={date}
      onChange={onChangeDate}
      popperClassName={styles.date}
      customInput={<CustomInput />}
    />
  );
};

export default Datepicker;
