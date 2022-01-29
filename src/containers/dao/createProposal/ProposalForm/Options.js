import { useState } from 'react';

import Input from 'components/Input';
import { Controller } from 'react-hook-form';
import styles from './styles.module.scss';
import CharCounter from '../../../../components/CharCounter';

const Options = ({ control }) => {
  const [options, setOptions] = useState(
    [{
      name: 1,
    },
    ],
  );
  const [show, setShow] = useState(null);

  const onAddOption = () => {
    if (options.length <= 3) {
      setOptions([...options, { name: options[options.length - 1].name + 1 }]);
    }
  };

  const finalOptions = [...options];
  finalOptions.push({
    name: '',
    defaultValue: "I'm disagree",
  });

  return (
    <div className={styles.panel}>
      <div className={styles['panel-header']}>Options</div>
      <div className={styles['panel-body']}>
        {finalOptions.map((option) => (
          <div key={option.name}>
            <Controller
              name={`option${option.name}`}
              control={control}
              defaultValue={option.defaultValue ?? ''}
              rules={{
                required: 'at least 2 options are required',
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
