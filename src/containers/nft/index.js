import { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Loading from 'components/Loading';
import NFTHeader from 'components/NFTHeader';
import SelectOption from 'components/SelectOption';
import fetchAllLusi from 'api/AllLusiAPI';
import AllLusiData from './allLusiData';

import styles from './styles.module.scss';

const Container = ({ children }) => (
  <div className="container-fluid">
    <Head>
      <title>NFT | Lumenswap</title>
    </Head>
    <NFTHeader />
    {children}
  </div>
);

const dropdownItems = [
  { value: '1', label: 'Price: Low to High' },
  { value: '2', label: 'Price: High to Low' },
  { value: '3', label: 'Number: 1 to 107' },
  { value: '4', label: 'Number: 107 to 1' },
];

const NftPage = () => {
  const [select, setSelect] = useState(dropdownItems[0]);
  const [allLusi, setAllLusi] = useState(null);

  useEffect(() => {
    fetchAllLusi().then((data) => {
      setAllLusi(data);
    });
  }, []);

  let filteredLusi = allLusi;

  if (!allLusi) {
    return (
      <Container>
        <div className={styles['loading-container']}>
          <Loading size={48} />
        </div>
      </Container>
    );
  }

  if (select.value === '1') {
    filteredLusi = filteredLusi.sort((a, b) => a.price - b.price);
  }
  if (select.value === '2') {
    filteredLusi = filteredLusi.sort((a, b) => b.price - a.price);
  }
  if (select.value === '3') {
    filteredLusi = filteredLusi.sort((a, b) => a.id - b.id);
  }
  if (select.value === '4') {
    filteredLusi = filteredLusi.sort((a, b) => b.id - a.id);
  }

  return (
    <Container>
      <div className={classNames('layout main', styles.main)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>All Lusi’s</h1>
              <SelectOption
                items={dropdownItems}
                setValue={setSelect}
                defaultValue={select}
                className={styles.filter}
                isSearchable={false}
              />
            </div>
            <AllLusiData allLusi={filteredLusi} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NftPage;
