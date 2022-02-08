import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { closeModalAction } from 'actions/modal';
import humanAmount from 'helpers/humanAmount';
import styles from './styles.module.scss';

const ConfirmVoteModal = ({ proposalInfo }) => {
  const radioGroupOptions = proposalInfo.votes.map((vote) => ({
    ...vote,
    value: vote.title.toLowerCase(),
    label: vote.title,
  }));
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(closeModalAction());
  };
  return (
    <div className="pb-4 main">
      <p className={styles.title}>
        {proposalInfo.title}
      </p>
      <div className={styles.form}>
        <div className="my-4">
          <RadioGroup
            options={radioGroupOptions}
            value={proposalInfo.vote}
            className="radio-group"
            onUpdate={() => {}}
          />
        </div>

        <div className={styles.value}>
          <div className={styles['value-name']}>Amount</div>
          <div className={styles['value-amount']}>{humanAmount(proposalInfo.amount, true)} {proposalInfo.asset.code}</div>
        </div>

        <div className={styles.msg}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua Egestas purus viverra accumsan in nisl nisi
        </div>
        <Button
          variant="primary"
          content="Confirm"
          className={styles.btn}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default ConfirmVoteModal;
