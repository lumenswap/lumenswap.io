import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import styles from './styles.module.scss';
import NotFoundIcon from '../../assets/images/404.png';

function NotFound() {
  return (
    <div className="container-fluid">
      <Head>
        <title>
          404 - Not Found
        </title>
      </Head>
      <div className="row justify-content-center">
        <div className={styles.main}>
          <Image
            src={NotFoundIcon}
            width="633px"
            height="352px"
          />
          <span className={styles.error}>Oh No! Error 404</span>
          <span className={styles.info}>
            The page you are looking for isn’t found!
            we suggest you back to home
          </span>
          <Link href="/">
            <a className={styles.link}>
              <div className={styles.btn}>
                <span>Back to home</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getInitialProps = async ({ req, res }) => {
  res.statusCode = 404;
  return { props: {} };
};

export default NotFound;
