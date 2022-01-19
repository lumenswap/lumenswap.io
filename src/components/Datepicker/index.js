import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import CalenderIcon from 'assets/images/calender';

import styles from './styles.module.scss';

const Datepicker = ({ selected, onChange }) => {
  const [date, setDate] = useState(selected);
  const CustomInput = forwardRef(({ value, onClick },
    ref) => (
      <div className={styles.select} ref={ref} onClick={onClick}>
        {moment(value).format('DD MMM YYYY')}
        <CalenderIcon />
      </div>
  ));
  const onChangeDate = (selectedDate) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <DatePicker
      selected={date}
      onChange={onChangeDate}
      customInput={<CustomInput />}
      popperClassName={styles.date}
    />
  );
};

Datepicker.propTypes = {

};

export default Datepicker;
