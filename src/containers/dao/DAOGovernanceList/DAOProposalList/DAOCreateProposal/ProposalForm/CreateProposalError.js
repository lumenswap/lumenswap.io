import AlertIcon from 'assets/images/alert';
import styles from './styles.module.scss';

function CreateProposalError({ error }) {
  return (
    <div className={styles['error-container']}>
      <AlertIcon color="var(--punch)" className={styles['error-container-icon']} />
      <div className={styles['error-container-text']}>{error}</div>
    </div>
  );
}

export default CreateProposalError;
