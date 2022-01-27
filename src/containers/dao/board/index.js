import Head from 'next/head';
import classNames from 'classnames';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import BoardItem from 'containers/dao/BoardItem';

import styles from './styles.module.scss';

const DaoBoard = ({ boards }) => {
  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Board | Lumenswap</title>
      </Head>
      <DAOHeader />
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
              <div className="row mt-4">
                {boards.map((item) => (
                  <div key={item.name} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                    <BoardItem item={item} size="md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default DaoBoard;
