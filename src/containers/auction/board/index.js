import Head from 'next/head';
import classNames from 'classnames';

import AuctionHeader from 'components/AuctionHeader';
import BoardList from 'components/BoardList';

import styles from './styles.module.scss';

const AuctionBoard = () => {
  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Auction Board | Lumenswap</title>
      </Head>
      <AuctionHeader />
      {children}
    </div>
  );

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <h1 className={styles.title}>Auction Board</h1>
        <BoardList />
      </div>
    </Container>
  );
};

export default AuctionBoard;
