import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import { getNFTCollections } from 'api/nft';
import classNames from 'classnames';
import ServerSideLoading from 'components/ServerSideLoading';
import styles from './styles.module.scss';
import { NFTListContainer } from '../NFTLusiList';
import CollectionCard from './CollectionCard';

function NFTCollectionPage() {
  const [nftCollections, setNFTCollections] = useState(null);

  useEffect(() => {
    getNFTCollections().then((nftCollectionsData) => {
      setNFTCollections(nftCollectionsData);
    });
  }, []);

  if (!nftCollections) {
    return (
      <NFTListContainer title="Collections | Lumenswap">
        <div className={styles['loading-container']}>
          <Loading size={48} />
        </div>
      </NFTListContainer>
    );
  }

  return (
    <NFTListContainer title="Collections | Lumenswap">
      <ServerSideLoading>
        <div className={classNames('layout main', styles.main)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <h1 className={styles.title}>Collections</h1>
              <div className={classNames('row', styles.row, styles['m-t-row'])}>
                {nftCollections
                  .map((collection) => (
                    <div key={collection.id} className={classNames('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12', styles.col, styles['m-t-col'])}>
                      <CollectionCard collection={collection} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </NFTListContainer>

  );
}

export default NFTCollectionPage;
