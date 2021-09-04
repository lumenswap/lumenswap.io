import Head from 'next/head';
import classNames from 'classnames';
import Lusi from 'assets/images/lusi';
import Spaceship from 'assets/images/spaceship';
import styles from './styles.module.scss';

function NotFound() {
  return (
    <>
      <Head>
        <title>
          404 - Not Found
        </title>
      </Head>
      <div className={styles.main}>
        <div className="container-fluid">
          <div className={styles.svg}>
            <Spaceship />
            <div className={classNames(styles.lusi, styles['up-down'])}>
              <Lusi />
            </div>
          </div>
          <div className={styles.title}>Oh No! Error 404</div>
          <p className={styles.text}>
            The page you are looking for isn’t found! we suggest you back to home
          </p>
          <a href="/" className={classNames(styles.link, styles.btn)}>Back to home</a>
        </div>
      </div>
    </>
  );
}

export default NotFound;
