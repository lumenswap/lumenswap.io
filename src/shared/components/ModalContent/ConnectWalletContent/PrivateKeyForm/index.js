import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Loading from 'src/shared/components/Loading';
import styles from './styles.less';

const PrivateKeyForm = (props) => {
  const {
    register, handleSubmit, errors, formState,
  } = useForm({
    mode: 'onChange',
  });

  const [loadingTimer, setLoadingTimer] = useState(false);

  const onSubmit = (data) => {
    setLoadingTimer(true);
    const timer = setTimeout(() => {
      setLoadingTimer(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="key" className="primary-label">Enter private key</label>
        <input
          type="text"
          className="form-control primary-input"
          placeholder="G …"
          name="key"
          id="key"
          ref={register({ required: true })}
        />
      </div>
      <button
        type="submit"
        className={classNames('button-primary-lg mt-4',
          loadingTimer && 'loading-btn')}
        disabled={(!formState.isValid) || loadingTimer}
      >
        {loadingTimer ? (
          <div className="d-flex align-items-center justify-content-center w-100 h-100">
                Connecting<div className="ml-2"><Loading size={21} /></div>
          </div>
        ) : 'Connect'}
      </button>
    </form>
  );
};

PrivateKeyForm.propTypes = {

};

export default PrivateKeyForm;
