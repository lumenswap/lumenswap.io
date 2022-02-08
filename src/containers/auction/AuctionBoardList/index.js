import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import { getAllAuctions } from 'api/auction';
import AuctionContainer from 'containers/auction/AuctionContainer';
import AuctionBoardItem from './AuctionBoardItem';
import styles from './styles.module.scss';

const AuctionBoardList = () => {
  const [auctionBoards, setAuctionBoards] = useState(null);

  useEffect(() => {
    getAllAuctions().then((fetchedAuctionBoards) => setAuctionBoards(fetchedAuctionBoards));
  }, []);

  return (
    <AuctionContainer title="Auction board | Lumenswap">
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>Auction Board</h1>
            {!auctionBoards && (
              <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '50vh' }}>
                <Loading size={50} />
              </div>
            )}
            {auctionBoards
              ?.map((auctionBoard, i) => <AuctionBoardItem auction={auctionBoard} key={i} />)}
          </div>
        </div>
      </div>
    </AuctionContainer>
  );
};

export default AuctionBoardList;
