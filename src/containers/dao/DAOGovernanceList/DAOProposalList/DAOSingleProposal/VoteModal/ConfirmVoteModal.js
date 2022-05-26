import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import humanizeAmount from 'helpers/humanizeAmount';
import { Claimant } from 'stellar-sdk';
import { getAssetDetails } from 'helpers/asset';
import showGenerateTrx from 'helpers/showGenerateTrx';
import generateClaimableBalanceForDaoTRX from 'stellar-trx/generateClaimableBalanceForDaoTRX';
import showSignResponse from 'helpers/showSignResponse';
import { TIME_AFTER_PROPOSAL_END_TIME } from 'containers/dao/consts';
import styles from './styles.module.scss';

const ConfirmVoteModal = ({ proposalInfo }) => {
  const radioGroupOptions = proposalInfo.votes.map((vote) => ({
    ...vote,
    value: vote.optionNumber.toString(),
    label: vote.value,
  }));
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.user.detail.address);

  const handleConfirm = () => {
    const claimants = [
      new Claimant(userAddress, Claimant
        .predicateNot(Claimant
          .predicateBeforeAbsoluteTime(
            ((new Date(proposalInfo.endTime).getTime() + TIME_AFTER_PROPOSAL_END_TIME) / 1000)
              .toString(),
          ))),
      new Claimant(process.env.REACT_APP_DAO_LOCKER_ADDRESS, Claimant
        .predicateNot(Claimant
          .predicateBeforeAbsoluteTime(
            ((new Date(proposalInfo.endTime).getTime() + 3 * 30 * 24 * 60 * 60 * 1000) / 1000)
              .toString(),
          ))),
    ];

    async function generateClaimableBalance() {
      return generateClaimableBalanceForDaoTRX(
        userAddress,
        proposalInfo.amount,
        getAssetDetails(proposalInfo.asset),
        claimants,
        'L_DAO_V',
        `${proposalInfo.id}-${proposalInfo.vote}`,
      );
    }

    showGenerateTrx(generateClaimableBalance, dispatch)
      .then(async (claimableBalanceTRX) => {
        await showSignResponse(claimableBalanceTRX, dispatch);
      });
  };
  return (
    <div style={{ backgroundColor: 'var(--whiteToDarkGray)' }} className="pb-4 main">
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
          <div className={styles['value-amount']}>{humanizeAmount(proposalInfo.amount)} {proposalInfo.asset.code}</div>
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
