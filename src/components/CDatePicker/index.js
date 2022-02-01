import { forwardRef } from 'react';
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

const CDatePicker = ({
  onChange, value, minDate,
}) => {
  const onChangeDate = (selectedDate) => {
    onChange(selectedDate);
  };

  return (
    <DatePicker
      selected={value ?? new Date()}
      onChange={onChangeDate}
      popperClassName={styles.date}
      customInput={<CustomInput />}
      minDate={minDate}
    />
  );
};

export default CDatePicker;
