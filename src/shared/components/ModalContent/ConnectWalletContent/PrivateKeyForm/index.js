import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Loading from 'src/shared/components/Loading';
import fetchAccountFromPrivateKey from 'src/actions/user/fetchAccountFromPrivateKey';
import hideModal from 'src/actions/modal/hide';
import userLoginAsPv from 'src/actions/user/loginAsPv';
import fetchUserBalance from 'src/api/fetchUserBalance';
import setToken from 'src/actions/setToken';
import reportConnectClick from 'src/api/metrics/reportConnectClick';
import styles from './styles.module.scss';

const PrivateKeyForm = () => {
  const {
    register, handleSubmit, watch, getValues,
  } = useForm({
    mode: 'onChange',
  });
  const [loadingTimer, setLoadingTimer] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [theUser, setTheUser] = useState('');

  const onSubmit = async (data) => {
    reportConnectClick();
    userLoginAsPv(data.key, theUser);
    setLoadingTimer(true);
    try {
      const balances = await fetchUserBalance(theUser);
      setToken(balances);
    } catch (e) {
      setToken([]);
    } finally {
      setLoadingTimer(false);
    }

    hideModal();
  };

  useEffect(() => {
    const val = getValues('key');
    setButtonDisable(true);
    if (val.length === 56) {
      setLoadingTimer(true);
      const address = fetchAccountFromPrivateKey(val);
      if (address) {
        setTheUser(address);
        setButtonDisable(false);
      }
      setLoadingTimer(false);
    }
  }, [watch('key')]);

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
        disabled={buttonDisable || loadingTimer}
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
