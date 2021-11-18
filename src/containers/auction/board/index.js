import Head from 'next/head';
import classNames from 'classnames';

import AuctionHeader from 'components/AuctionHeader';
import AuctionBoardList from '../AuctionBoardList';

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
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>Auction Board</h1>
            <AuctionBoardList data={[0, 1]} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuctionBoard;
