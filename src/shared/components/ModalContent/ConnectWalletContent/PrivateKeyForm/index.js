import React, { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Loading from 'src/shared/components/Loading';
import fetchAccountFromPrivateKey from 'src/actions/user/fetchAccountFromPrivateKey';
import hideModal from 'src/actions/modal/hide';
import userLoginAsPv from 'src/actions/user/loginAsPv';
import styles from './styles.less';

const PrivateKeyForm = () => {
  const {
    register, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
  });

  const [loadingTimer, setLoadingTimer] = useState(false);

  const onSubmit = (data) => {
    setLoadingTimer(true);

    const address = fetchAccountFromPrivateKey(data.key);
    if (address) {
      userLoginAsPv(data.key, address);

      setLoadingTimer(false);
      hideModal();
    } else {
      setLoadingTimer(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="key" className="primary-label">Enter private key</label>
        <input
          type="text"
          className="form-control primary-input"
          placeholder="S ..."
          name="key"
          id="key"
          ref={register({ minLength: 56, maxLength: 56, required: true })}
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

export default PrivateKeyForm;
