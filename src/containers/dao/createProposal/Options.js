import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';

import styles from './styles.module.scss';

const Options = (props) => {
  const initialOptions = [1, 2];
  const [count, setCount] = useState(2);
  const [options, setOptions] = useState(initialOptions);

  const onAddOption = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if (count > 2) {
      setOptions((oldOptions) => [...oldOptions, count]);
    }
  }, [count]);

  useEffect(() => {
  }, [count]);
  return (
    <div className={styles.panel}>
      <div className={styles['panel-header']}>Options</div>
      <div className={styles['panel-body']}>
        {options.map((item) => (
          <div className={styles.group} key={item}>
            <label className="label-primary">Option {item}</label>
            <Input
              type="text"
              placeholder="Enter your address"
              height={40}
              fontSize={16}
            />
          </div>
        ))}

        <button
          type="button"
          className={styles['btn-dashed']}
          onClick={onAddOption}
        >Add option
        </button>
      </div>
    </div>
  );
};

Options.propTypes = {

};

export default Options;
