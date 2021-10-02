import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

import styles from './styles.module.scss';

const SetNFTPrice = ({ mode }) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const [contentMode, setContentMode] = useState({});
  async function onSubmit(data) { console.warn('data:', data); }

  useEffect(() => {
    if (mode === 'set') {
      setContentMode({
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        btnText: 'Set my price',
      });
    }

    if (mode === 'change') {
      setContentMode({
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
        btnText: 'Change',
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.info}>{contentMode.message}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label-primary mb-2 mt-4">Order price</label>
        <Controller
          name="price"
          control={control}
          defaultValue=""
          render={(props) => (
            <InputGroup
              variant="primary"
              placeholder="100"
              rightLabel="LSP"
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
        <Button
          htmlType="submit"
          variant="primary"
          content={contentMode.btnText}
          className={styles.btn}
        />
      </form>
    </div>
  );
};

export default SetNFTPrice;
