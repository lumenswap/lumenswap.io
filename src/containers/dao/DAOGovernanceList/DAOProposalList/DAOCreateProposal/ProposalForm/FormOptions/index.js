import { useState } from 'react';
import { Controller } from 'react-hook-form';
import plusIcon from 'assets/images/plus-icon.png';
import Option from './Option';
import styles from '../styles.module.scss';

const FormOptions = ({ control }) => {
  const [options, setOptions] = useState(
    [
      {
        id: 1,
      },
      {
        id: 10,
        defaultValue: 'Revoke Proposal',
      },
    ],
  );
  const [show, setShow] = useState(null);

  const onAddOption = () => {
    if (options.length <= 9) {
      const newOptions = [...options.slice(0, -1), {
        id: options.length,
      }, {
        ...options.slice(-1)[0],
      }];
      setOptions(newOptions);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles['panel-header']}>Options</div>
      <div className={styles['panel-body']}>
        {options.map((option, index) => (
          <Controller
            key={option.id}
            name={`option${option.id}`}
            control={control}
            defaultValue={option.defaultValue ?? ''}
            rules={{
              required: `${options.length < 3 ? 'At least 2 options are required' : 'Please fill out all options'}`,
            }}
            render={({ field }) => (
              <Option
                props={field}
                show={show}
                setShow={setShow}
                option={{
                  ...option,
                  number: index + 1,
                }}
              />
            )}
          />
        ))}

        {options.length <= 9 && (
        <button
          type="button"
          className={styles['btn-dashed']}
          onClick={onAddOption}
        >
          <div className={styles['plus-icon-container']}><img src={plusIcon} height={18} width={18} /></div>
          Add option
        </button>
        )}
      </div>
    </div>
  );
};

export default FormOptions;
