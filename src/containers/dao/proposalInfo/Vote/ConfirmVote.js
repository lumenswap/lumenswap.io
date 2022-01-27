import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { closeModalAction } from 'actions/modal';
import numeral from 'numeral';
import styles from './styles.module.scss';

const ConfirmVote = ({ info }) => {
  const items = info.votes.map((vote) => ({
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
        {info.title}
      </p>
      <form className={styles.form}>
        <div className="my-4">
          <RadioGroup
            items={items}
            name="opt-group"
            value={info.radioValue}
            className="radio-group"
            onUpdate={() => {}}
          />
        </div>

        <div className={styles.value}>
          <div className={styles['value-name']}>Amount</div>
          <div className={styles['value-amount']}>{numeral(info.amount).format('0.00a')} {info.asset.code}</div>
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
      </form>
    </div>
  );
};

export default ConfirmVote;
