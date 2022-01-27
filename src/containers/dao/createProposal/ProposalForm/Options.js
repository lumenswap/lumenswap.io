import { useState } from 'react';

import Input from 'components/Input';

import styles from './styles.module.scss';
import CharCounter from '../../../../components/CharCounter';

const Options = ({ control, Controller }) => {
  const initialOptions = [{
    name: 1,
    defaultValue: "I'm disagree",
  }, {
    name: 2,
  }];
  const [options, setOptions] = useState(initialOptions);
  const [show, setShow] = useState(null);

  const onAddOption = () => {
    if (options.length <= 4) {
      setOptions([...options, { name: options[options.length - 1].name + 1 }]);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles['panel-header']}>Options</div>
      <div className={styles['panel-body']}>
        {options.map((option) => (
          <div key={option.name}>
            <Controller
              name={`option${option.name}`}
              control={control}
              defaultValue={option.defaultValue ?? ''}
              rules={{
                required: 'fill out options',
              }}
              render={(props) => (
                <div className={styles.group}>
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="label-primary">Option {option.name}</label>
                    <CharCounter length={50} char={props.value} show={option === show} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    height={40}
                    fontSize={16}
                    value={props.value}
                    onChange={!option.defaultValue ? props.onChange : () => {}}
                    maxLength={50}
                    onFocus={() => { setShow(option); }}
                    onBlur={() => { setShow(null); }}
                    className={option.defaultValue && styles.defaultInput}
                  />
                </div>
              )}
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

export default Options;
