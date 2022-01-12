import Head from 'next/head';
import classNames from 'classnames';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import sampleLogo from 'assets/images/btc-logo.png';
import BoardItem from './BoardItem';

import styles from './styles.module.scss';

const DaoBoard = () => {
  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Board | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  const items = [
    {
      logo: sampleLogo, name: 'Lumenswap', desc: 'Lumenswap is a decentralized exchange built on the Stellar network that allows you to swap and trade assets using a friendly, minimal interface.', proposals: '1', member: '110,000', tiker: 'LSP',
    },
    {
      logo: sampleLogo, name: 'Rabet', desc: 'Rabet is an integrated set of open-source wallets for the Stellar network, allowing everyone around the world to interact with Stellar.', proposals: '2', member: '20,000', tiker: 'RBT',
    },
  ];

  return (
    <Container>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <h1 className={styles.title}>Board</h1>
              <div className="row mt-4">
                {items.map((item) => (
                  <div key={item.name} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                    <BoardItem item={item} />
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
