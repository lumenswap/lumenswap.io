import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Submitting from 'components/Submitting';
import getPubFromPv from 'helpers/getPubFromPv';
import { fetchAccountTokenList } from 'api/stellar';
import { setUserBalance } from 'actions/userBalance';
import userLogin from 'actions/user/login';
import { loginTypes } from 'reducers/user';
import { closeModalAction } from 'actions/modal';
import balanceMapper from 'helpers/balanceMapper';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

const EnterKey = () => {
  const [loadingTimer, setLoadingTimer] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  function onSubmit(data) {
    setLoadingTimer(true);
    const address = getPubFromPv(data.privateKey);

    fetchAccountTokenList(address)
      .then((res) => {
        dispatch(userLogin(loginTypes.PV, { address, privateKey: data.privateKey }));
        dispatch(setUserBalance(res.map(balanceMapper)));
        dispatch(closeModalAction());
      })
      .catch(console.log)
      .finally(() => {
        setLoadingTimer(false);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className="form-group mb-0">
        <label htmlFor="code" className="label-primary">Enter Your Private key</label>
        <Input
          type="text"
          placeholder="S…"
          name="privateKey"
          id="privateKey"
          height={48}
          innerRef={register({
            required: true,
            validate: (text) => {
              const pv = getPubFromPv(text);
              if (pv) {
                return true;
              }

              return false;
            },
          })}
          input={{ autoComplete: 'off' }}
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
