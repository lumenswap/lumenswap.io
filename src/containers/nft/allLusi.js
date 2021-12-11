import { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Loading from 'components/Loading';
import SelectOption from 'components/SelectOption';
import fetchAllLusi from 'api/AllLusiAPI';
import BN from 'helpers/BN';
import NFTHeader from './NFTHeader';
import AllLusiData from './allLusiData';
import styles from './styles.module.scss';

const Container = ({ children }) => (
  <div className="container-fluid">
    <Head>
      <title>All Lusi’s | Lumenswap</title>
    </Head>
    <NFTHeader />
    {children}
  </div>
);

const dropdownItems = [
  { value: '1', label: 'Price: Low to High' },
  { value: '2', label: 'Price: High to Low' },
  { value: '3', label: 'Number: 1 to 108' },
  { value: '4', label: 'Number: 108 to 1' },
];

const NftPage = () => {
  const [select, setSelect] = useState(dropdownItems[1]);
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
    filteredLusi = filteredLusi.sort((a, b) => new BN(a.price).comparedTo(b.price));
  }
  if (select.value === '2') {
    filteredLusi = filteredLusi.sort((a, b) => new BN(b.price).comparedTo(a.price));
  }
  if (select.value === '3') {
    filteredLusi = filteredLusi.sort((a, b) => new BN(a.number).comparedTo(b.number));
  }
  if (select.value === '4') {
    filteredLusi = filteredLusi.sort((a, b) => new BN(b.number).comparedTo(a.number));
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
