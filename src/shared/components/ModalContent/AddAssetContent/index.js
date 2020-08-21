import React, { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Loading from 'src/shared/components/Loading';
import styles from './styles.module.scss';
import checkAsset from 'src/api/checkAsset';

const AddAssetContent = () => {
  const [loadingTimer, setLoadingTimer] = useState(false);
  const [safeToGo, setSafeToGo] = useState(false);
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    setLoadingTimer(true);
    const timer = setTimeout(() => {
      setLoadingTimer(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group pt-2">
        <label htmlFor="code" className="primary-label">
          Asset code
        </label>
        <input
          type="text"
          className="form-control primary-input"
          placeholder="USD"
          name="code"
          id="code"
          ref={register({ required: true })}
        />
      </div>
      <div className="form-group pt-2">
        <label htmlFor="issuer" className="primary-label">
          Asset issuer
        </label>
        <input
          type="text"
          className="form-control primary-input"
          placeholder="G …"
          name="issuer"
          id="issuer"
          ref={register({
            required: true,
            maxLength: 56,
            minLength: 56,
            validate: (issuer) => checkAsset(getValues('code'), issuer),
          })}
        />
      </div>
      <button
        type="submit"
        className={classNames(
          'button-primary-lg mt-3',
          loadingTimer && 'loading-btn'
        )}
        disabled={!formState.isValid || loadingTimer}
      >
        {loadingTimer ? (
          <div className="d-flex align-items-center justify-content-center w-100 h-100">
            Adding
            <div className="ml-2">
              <Loading size={21} />
            </div>
          </div>
        ) : (
          'Add assets'
        )}
      </button>
    </form>
  );
};

export default AddAssetContent;
