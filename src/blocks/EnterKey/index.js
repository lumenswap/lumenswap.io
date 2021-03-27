import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Submitting from 'components/Submitting';
import styles from './styles.module.scss';

const EnterKey = ({ type }) => {
  const [loadingTimer, setLoadingTimer] = useState(false);
  const { register, handleSubmit, formState } = useForm({
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className="form-group mb-0">
        <label htmlFor="code" className="label-primary">Enter {type} key</label>
        <Input
          type="text"
          placeholder="G …"
          name="key"
          id="key"
          height={48}
          ref={register({
            required: true,
          })}
        />
      </div>
      <Button
        htmlType="submit"
        size="100%"
        variant="primary"
        content={loadingTimer ? <Submitting text="Connecting" loadingSize={21} /> : 'Connect'}
        disabled={!formState.isValid || loadingTimer}
      />
    </form>
  );
};

export default EnterKey;
