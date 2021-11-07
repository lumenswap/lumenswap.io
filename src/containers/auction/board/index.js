import Head from 'next/head';
import classNames from 'classnames';

import AuctionHeader from 'components/AuctionHeader';

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
        auction
      </div>
    </Container>
  );
};

export default AuctionBoard;
