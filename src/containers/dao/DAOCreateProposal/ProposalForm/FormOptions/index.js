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
      id: 10,
      defaultValue: 'Revoke Proposal',
    },
    ],
  );
  const [show, setShow] = useState(null);

  const onAddOption = () => {
    if (options.length <= 9) {
      const newOptions = [...options];
      newOptions[newOptions.length - 1].name = newOptions.length + 1;
      newOptions.splice(newOptions.length - 1, 0, {
        name: newOptions[newOptions.length - 2].name + 1,
        id: newOptions[newOptions.length - 2].id + 1,
      });
      setOptions(newOptions);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles['panel-header']}>Options</div>
      <div className={styles['panel-body']}>
        {options.map((option) => (
          <div key={option.id}>
            <Controller
              name={`option${option.name}`}
              control={control}
              defaultValue={option.defaultValue ?? ''}
              rules={{
                required: {
                  value: options.length < 2,
                  message: `${options.length < 2 ? 'At least 2 options are required' : 'Please fill out all options'}`,
                },
              }}
              render={(props) => (
                <Option
                  props={props}
                  ß
                  show={show}
                  setShow={setShow}
                  option={option}
                />
              )}
            />
          </div>
        ))}

        {options.length <= 9 && (
        <button
          type="button"
          className={styles['btn-dashed']}
          onClick={onAddOption}
        >
          <div className={styles['plus-icon-container']}><Image src={plusIcon} height={18} width={18} /></div>
          Add option
        </button>
        )}
      </div>
    </div>
  );
};

export default FormOptions;
