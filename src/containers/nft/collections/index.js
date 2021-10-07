import Head from 'next/head';
import ObmHeader from 'components/ObmHeader';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import CardThumbnail from 'components/CardThumbnail';
import imgSrc from 'assets/images/nft-sample.png';

import styles from './styles.module.scss';

const items = [
  {
    name: 'Lusi-1', price: '3,100', img: imgSrc, id: '1',
  },
  {
    name: 'Lusi-2', price: '3,100', img: imgSrc, id: '2',
  },
];

const NFTCollections = () => {
  const router = useRouter();
  return (
    <div className="container-fluid">
      <Head>
        <title>NFT Collections | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">

            <h1 className={styles.title}>My Lusi</h1>

            <div className={classNames('row', styles.row)}>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={classNames('col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12 mt-4', styles.col)}
                >
                  <CardThumbnail
                    name={item.name}
                    imgSrc={item.img}
                    price={item.price}
                    onClick={() => { router.push(`nft/${item.id}`); }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCollections;
