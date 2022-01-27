import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import RadioGroup from 'components/RadioGroup';
import { closeModalAction, openModalAction } from 'actions/modal';

import BN from 'helpers/BN';
import { getAssetDetails, isSameAsset } from 'helpers/asset';
import styles from './styles.module.scss';
import ConfirmVote from './ConfirmVote';

const Vote = ({ info }) => {
  const dispatch = useDispatch();
  const items = info.votes.map((vote) => ({
    ...vote,
    value: vote.title.toLowerCase(),
    label: vote.title,
  }));
  const [radioValue, setRadioValue] = useState(items[0].value);
  const userBalances = useSelector((state) => state.userBalance);

  const userCurrentAssetBalance = userBalances
    .find((i) => isSameAsset(getAssetDetails(i.asset), getAssetDetails(info.asset)))?.balance ?? '0';
  const {
    handleSubmit, control, errors, trigger, formState,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    trigger();
  }, []);

  async function onSubmit(data) {
    console.log(data);
    dispatch(closeModalAction());

    dispatch(openModalAction({
      modalProps: {
        title: 'Confirm vote',
        mainClassName: 'modal-br8',
      },
      content: <ConfirmVote info={{
        ...info,
        radioValue,
        amount: data.tokenAmount,
      }}
      />,
    }));
  }

  function submitContentGenerator() {
    for (const err of Object.values(errors)) {
      if (err) {
        return err.message;
      }
    }
    return 'Vote';
  }

  function onChange(value) {
    setRadioValue(value);
    console.log(value);
  }
  const validateAmount = (value) => {
    if (new BN(0).gte(value)) {
      return 'Amount is not valid';
    }
    if (new BN(value).gt(userCurrentAssetBalance)) {
      return `Insufficient ${info.asset.code} balance`;
    }
    return true;
  };

  return (
    <div className="pb-4 main">
      <p className={styles.title}>
        {info.title}
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <RadioGroup
            items={items}
            name="opt-group"
            value={radioValue}
            className="radio-group"
            onUpdate={onChange}
          />
        </div>
        <hr className={styles.hr} />
        <label className="label-primary mb-1">Amount</label>
        <Controller
          name="tokenAmount"
          control={control}
          defaultValue=""
          rules={{
            required: 'Amount is required',
            validate: validateAmount,
          }}
          render={(props) => (
            <InputGroup
              variant="primary"
              placeholder="100"
              rightLabel={info.asset.code}
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
        <div className={styles.msg}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua Egestas purus viverra accumsan in nisl nisi
        </div>
        <Button
          htmlType="submit"
          variant="primary"
          content={submitContentGenerator()}
          className={styles.btn}
          disabled={formState.isValidating || !formState.isValid}
        />
      </form>
    </div>
  );
};

export default Vote;
