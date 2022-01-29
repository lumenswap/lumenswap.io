import classNames from 'classnames';
import AngleIcon from 'assets/images/angleRight';
import TickIcon from 'assets/images/tick';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import styles from './styles.module.scss';

function SuccessMessage() {
  const router = useRouter();
  const pageName = router.query.name;
  const handleRouterPush = () => {
    router.push(urlMaker.dao.singleDao.root(pageName));
  };
  return (
    <div className={classNames(styles.card, styles['card-small'], styles.success)}>
      <TickIcon />
      <div className={styles['success-title']}>It’s done</div>
      <p className={styles['success-msg']}>
        Your proposal was successfully created.
      </p>
      <Button
        variant="primary"
        onClick={handleRouterPush}
        className={styles['success-btn']}
      >
        Proposal page
        <AngleIcon />
      </Button>
    </div>
  );
}

export default SuccessMessage;
