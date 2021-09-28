import { useState } from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import ObmHeader from 'components/ObmHeader';
import CardThumbnail from 'components/CardThumbnail';
import imgSrc from 'assets/images/nft-sample.png';
import SelectOption from 'components/SelectOption';

import styles from './styles.module.scss';

const items = [
  {
    name: 'Lusi-1', price: '3,100', img: imgSrc, id: '1',
  },
  {
    name: 'Lusi-2', price: '3,100', img: imgSrc, id: '2',
  },
  {
    name: 'Lusi-3', price: '3,100', img: imgSrc, id: '3',
  },
  {
    name: 'Lusi-4', price: '3,100', img: imgSrc, id: '4',
  },
  {
    name: 'Lusi-5', price: '3,100', img: imgSrc, id: '5',
  },
  {
    name: 'Lusi-6', price: '3,100', img: imgSrc, id: '6',
  },
  {
    name: 'Lusi-7', price: '3,100', img: imgSrc, id: '7',
  },
  {
    name: 'Lusi-8', price: '3,100', img: imgSrc, id: '8',
  },
];

const dropdownItems = [
  { value: '1', label: 'Price: Low to High' },
  { value: '2', label: 'Price: High to Low' },
  { value: '3', label: 'Number: 1 to 107' },
  { value: '4', label: 'Number: 107 to 1' },
];

const nft = () => {
  const [select, setSelect] = useState(dropdownItems[0]);
  return (
    <div className="container-fluid">
      <Head>
        <title>NFT | Lumenswap</title>
      </Head>
      <ObmHeader />
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>All Lusi’s</h1>
              <SelectOption
                items={dropdownItems}
                setValue={setSelect}
                className={styles.filter}
                isSearchable={false}
              />
            </div>
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
                    index={index}
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

export default nft;
