import { useState } from 'react';

import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';

import styles from './styles.module.scss';

const ConfirmVote = () => {
  const items = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];
  const [radioValue, setRadioValue] = useState(items[0].value);

  function onChange(value) {
    setRadioValue(value);
    console.log(value);
  }

  return (
    <div className="pb-4 main">
      <p className={styles.title}>
        Will Joe Biden win the 2020 United States presidential election?
      </p>
      <form className={styles.form}>
        <div className="my-4">
          <RadioGroup
            items={items}
            name="opt-group"
            value={radioValue}
            className="radio-group"
            onUpdate={onChange}
          />
        </div>

        <div className={styles.value}>
          <div className={styles['value-name']}>Amount</div>
          <div className={styles['value-amount']}>100K LSP</div>
        </div>

        <div className={styles.msg}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua Egestas purus viverra accumsan in nisl nisi
        </div>
        <Button
          variant="primary"
          content="Confirm"
          className={styles.btn}
        />
      </form>
    </div>
  );
};

export default ConfirmVote;
