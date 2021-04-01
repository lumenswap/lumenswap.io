import classNames from 'classnames';
import styles from './styles.module.scss';

const WaitingContent = ({ message }) => (
  <div className={styles.container}>
    <div className={classNames(styles.loading, 'mx-auto d-block')} />
    <h1 className={styles.message}>{message}</h1>
  </div>
);

export default WaitingContent;
