import Loading from 'components/Loading';
import styles from './styles.module.scss';

function LoadingWithContainer() {
  return (
    <div className={styles['loading-container']}>
      <Loading size={48} />
    </div>
  );
}

export default LoadingWithContainer;
