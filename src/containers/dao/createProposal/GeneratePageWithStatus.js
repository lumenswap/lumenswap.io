import classNames from 'classnames';
import Loading from 'components/Loading';
import ProposalForm from './ProposalForm';
import SuccessMessage from './SuccessMessage';
import styles from './styles.module.scss';

const GeneratePageWithStatus = ({ status, setStatus, info }) => {
  if (status === 'loading') {
    return (
      <div className={classNames(styles.card, styles['card-small'], styles.loading)}>
        <Loading size={48} />
        <p className={styles['loading-msg']}>
          Please wait, This operation may take a few minutes.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <SuccessMessage />
    );
  }

  return (
    <div className={classNames(styles.card, styles['card-regular'])}>
      <ProposalForm setStatus={setStatus} info={info} />
    </div>
  );
};

export default GeneratePageWithStatus;
