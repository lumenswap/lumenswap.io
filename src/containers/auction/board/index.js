import Head from 'next/head';
import classNames from 'classnames';
import bannerSrc from 'assets/images/auction-banner.png';
import urlMaker from 'helpers/urlMaker';
import AuctionHeader from 'components/AuctionHeader';
import AuctionBoardItem from '../AuctionBoardItem';
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
  const boards = [
    {
      title: 'Rabet (RBT)',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      sellAmount: '10,000,000 RBT',
      basePrice: '0.3 XLM',
      logo: bannerSrc,
      url: urlMaker.auction.board.root('Rabet(RBT)'),
      isLive: true,
    },
    {
      title: 'Rabet (RBT)',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      sellAmount: '50,000,000 RBT',
      basePrice: '0.4 XLM',
      logo: bannerSrc,
      url: urlMaker.auction.board.root('Rabet(RBT)'),
      isLive: false,
    },
  ];

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>Auction Board</h1>
            {boards.map((board, i) => <AuctionBoardItem board={board} key={i} />)}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuctionBoard;
