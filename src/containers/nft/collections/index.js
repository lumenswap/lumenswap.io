import Head from 'next/head';
import NFTHeader from 'components/NFTHeader';
import classNames from 'classnames';
import fetchMyLusi from 'helpers/myLusiAPI';
import CardThumbnail from 'containers/nft/CardThumbnail';
import Loading from 'components/Loading';
import urlMaker from 'helpers/urlMaker';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const PageTemplate = ({ children }) => (
  <div className="container-fluid">
    <Head>
      <title>NFT Collections | Lumenswap</title>
    </Head>
    <NFTHeader />
    {children}
  </div>
);

const NFTCollections = () => {
  const [myLusi, setMyLusi] = useState(null);
  const userAdress = useSelector((state) => state.user.detail.address);

  const isLogged = useSelector((state) => state.user.logged);

  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.nft.root());
    }
  }, []);

  useEffect(() => {
    fetchMyLusi(userAdress).then((data) => setMyLusi(data));
  }, []);

  if (!myLusi) {
    return (
      <PageTemplate>
        <div className={styles['loading-container']}>
          <Loading size={48} />
        </div>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate>
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">

            <h1 className={styles.title}>My Lusi</h1>

            <div className={classNames('row', styles.row)}>
              {myLusi?.map((item) => (
                <div
                  key={item.id}
                  className={classNames('col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12 mt-4', styles.col)}
                >
                  <CardThumbnail
                    name={item.name}
                    imgSrc={item.img}
                    price={item.price}
                    url={urlMaker.nft.lusi(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default NFTCollections;
