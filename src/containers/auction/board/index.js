import Head from 'next/head';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import ServerSideLoading from 'components/ServerSideLoading';
import { getAllAuctions } from 'api/auction';
import AuctionHeader from '../AuctionHeader';
import AuctionBoardItem from './AuctionBoardItem';
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

  const [boards, setBoards] = useState(null);

  useEffect(() => {
    getAllAuctions().then((fetchedBoards) => setBoards(fetchedBoards));
  }, []);

  return (
    <Container>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <h1 className={styles.title}>Auction Board</h1>
              {!boards && (
              <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '50vh' }}>
                <Loading size={50} />
              </div>
              )}
              {boards?.map((board, i) => <AuctionBoardItem board={board} key={i} />)}
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default AuctionBoard;
