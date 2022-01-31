import { useState } from 'react';
import { Controller } from 'react-hook-form';
import plusIcon from 'assets/images/plus-icon.png';
import Image from 'next/image';
import Option from './Option';
import styles from '../styles.module.scss';

const FormOptions = ({ control }) => {
  const [options, setOptions] = useState(
    [{
      name: 1,
      id: 1,
    },
    {
      name: 2,
      defaultValue: "I'm disagree",
      id: 5,
    },
    ],
  );
  const [show, setShow] = useState(null);

  const onAddOption = () => {
    if (options.length <= 4) {
      const newOptions = [...options];
      newOptions[newOptions.length - 1].name = newOptions.length + 1;
      setOptions([...newOptions, {
        name: options[options.length - 2].name + 1,
        id: options[options.length - 2].id + 1,
      }]);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles['panel-header']}>Options</div>
      <div className={styles['panel-body']}>
        {options.sort((a, b) => a.id - b.id).map((option) => (
          <div key={option.id}>
            <Controller
              name={`option${option.name}`}
              control={control}
              defaultValue={option.defaultValue ?? ''}
              rules={{
                required: `${option.name === 1 ? 'At least 2 options are required' : 'Please fill out all options'}`,
              }}
              render={(props) => (
                <Option data={{
                  props,
                  show,
                  setShow,
                  option,
                }}
                />
              )}
            />
          </div>
        ))}

        <button
          type="button"
          className={styles['btn-dashed']}
          onClick={onAddOption}
        >
          <div className={styles['plus-icon-container']}><Image src={plusIcon} height={18} width={18} /></div>
          Add option
        </button>
      </div>
    </div>
  );
};

export default FormOptions;
