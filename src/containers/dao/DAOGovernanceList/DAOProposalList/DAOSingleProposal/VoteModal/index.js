import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import RadioGroup from 'components/RadioGroup';
import { openModalAction } from 'actions/modal';
import BN from 'helpers/BN';
import { getAssetDetails } from 'helpers/asset';
import useUserSingleAsset from 'hooks/useUserSingleAsset';
import styles from './styles.module.scss';
import ConfirmVoteModal from './ConfirmVoteModal';

const validateAmount = (value, userAssetBalance, info) => {
  if (new BN(0).gte(value)) {
    return 'Amount must be above 0';
  }
  if (new BN(value).gt(userAssetBalance?.balance ?? '0')) {
    return `Insufficient ${info.asset.code} balance`;
  }
  return true;
};

const VoteModal = ({ proposalInfo }) => {
  const dispatch = useDispatch();
  const radioGroupOptions = proposalInfo.votes.map((vote) => ({
    ...vote,
    value: vote.optionNumber,
    label: vote.value,
  }));
  const userAssetBalance = useUserSingleAsset(getAssetDetails(proposalInfo.asset));

  const {
    handleSubmit, control, errors, trigger, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      vote: radioGroupOptions[0].value,
    },
  });

  useEffect(() => {
    trigger();
  }, []);

  async function onSubmit(data) {
    dispatch(openModalAction({
      modalProps: {
        title: 'Confirm vote',
        mainClassName: 'modal-br8',
      },
      content: <ConfirmVoteModal proposalInfo={{
        ...proposalInfo,
        vote: data.vote,
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

  return (
    <div className="pb-4 main">
      <p className={styles.title}>
        {proposalInfo.title}
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <Controller
            control={control}
            name="vote"
            render={(props) => (
              <RadioGroup
                options={radioGroupOptions}
                value={props.value}
                className="radio-group"
                onUpdate={props.onChange}
              />
            )}
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
            validate: (value) => (validateAmount(value, userAssetBalance, proposalInfo)),
          }}
          render={(props) => (
            <InputGroup
              variant="primary"
              placeholder="100"
              rightLabel={proposalInfo.asset.code}
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
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

export default VoteModal;
