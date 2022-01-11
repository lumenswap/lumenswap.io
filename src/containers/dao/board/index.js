import Head from 'next/head';
import classNames from 'classnames';

import ServerSideLoading from 'components/ServerSideLoading';

import styles from './styles.module.scss';

const DaoBoard = (props) => {
  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Board | Lumenswap</title>
      </Head>
      header
      {children}
    </div>
  );
  return (
    <Container>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <h1 className={styles.title}>Board</h1>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default DaoBoard;
