import { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Input from 'components/Input';
import Button from 'components/Button';
import Submitting from 'components/Submitting';
import styles from './styles.module.scss';

const AddAsset = ({ toggleModal }) => {
  const [loadingTimer, setLoadingTimer] = useState(false);
  const {
    register, handleSubmit, formState, getValues,
  } = useForm({
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
      <div className="form-group mb-3">
        <label htmlFor="code" className="label-primary">Asset code</label>
        <Input
          type="text"
          placeholder="USD"
          name="code"
          id="code"
          height={48}
          ref={register({
            required: true,
          })}
        />
      </div>
      <div className="form-group mb-0">
        <label htmlFor="issuer" className="label-primary">Asset issuer</label>
        <Input
          type="text"
          className="form-control primary-input"
          placeholder="G …"
          name="issuer"
          id="issuer"
          ref={register({
            required: true,
            maxLength: 56,
            minLength: 56,
          })}
        />
      </div>
      <Button
        htmlType="submit"
        size="100%"
        variant="primary"
        className={classNames(loadingTimer && 'loading-btn', styles.btn)}
        disabled={!formState.isValid || loadingTimer}
        onClick={() => {}}
        content={
            loadingTimer ? (
              <Submitting text="Adding" loadingSize={21} />
            ) : (
              'Add asset'
            )
        }
      />
    </form>
  );
};

export default AddAsset;
