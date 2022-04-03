import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Submitting from 'components/Submitting';
import getPubFromPv from 'helpers/getPubFromPv';
import { fetchAccountDetails } from 'api/stellar';
import { setUserBalance } from 'actions/userBalance';
import userLogin from 'actions/user/login';
import { loginTypes } from 'reducers/user';
import { closeModalAction } from 'actions/modal';
import { filterUserBalance } from 'helpers/balanceMapper';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

const validatePrivateKey = (privateKey) => {
  const pv = getPubFromPv(privateKey);
  if (pv) {
    return true;
  }

  return false;
};

const EnterKey = () => {
  const [loadingTimer, setLoadingTimer] = useState(false);
  const dispatch = useDispatch();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  function onSubmit(formData) {
    setLoadingTimer(true);
    const address = getPubFromPv(formData.privateKey);

    fetchAccountDetails(address)
      .then((res) => {
        dispatch(userLogin(loginTypes.PV, {
          address,
          privateKey: formData.privateKey,
          subentry: res.subentry,
        }));
        dispatch(setUserBalance(filterUserBalance(res.balances)));
        dispatch(closeModalAction());
      })
      .finally(() => {
        setLoadingTimer(false);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className="form-group mb-0">
        <label htmlFor="code" className="label-primary">Enter Your Private key</label>
        <Controller
          name="privateKey"
          control={control}
          rules={{
            required: true,
            validate: validatePrivateKey,
          }}
          render={({ field }) => (
            <Input
              type="text"
              onChange={field.onChange}
              value={field.value}
              placeholder="S…"
              id="privateKey"
              height={48}
              input={{ autoComplete: 'off' }}
            />
          )}
        />
      </div>
      <Button
        htmlType="submit"
        size="100%"
        variant="primary"
        fontWeight={500}
        content={loadingTimer ? <Submitting text="Connecting" loadingSize={21} /> : 'Connect'}
        disabled={!formState.isValid || loadingTimer}
      />
    </form>
  );
};

export default EnterKey;
