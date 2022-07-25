import { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import Loading from 'components/Loading';
import SelectOption from 'components/SelectOption';
import BN from 'helpers/BN';
import ServerSideLoading from 'components/ServerSideLoading';
import NFTHeader from 'containers/nft/NFTHeader';
import { getCollectionNfts } from 'api/nft';
import { useRouter } from 'next/router';
import Input from 'components/Input';
import CollectionNftsData from './CollectionNftsData';
import styles from './styles.module.scss';
import CollectionDataCard from './CollectionDataCard';

export const NFTListContainer = ({ children, title }) => (
  <div className="container-fluid">
    <Head>
      <title>{title}</title>
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

const NFTCollectionListPage = ({ collectionData, collectionStats }) => {
  const [select, setSelect] = useState(dropdownItems[1]);
  const [collectionNfts, setCollectionNfts] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getCollectionNfts(router.query.collectionId).then((nfts) => {
      setCollectionNfts(nfts);
    });
  }, []);

  const handleSearchNfts = (e) => {
    setSearchQuery(e.target.value);
  };

  let filteredCollectionNfts = collectionNfts;

  if (!collectionNfts) {
    return (
      <NFTListContainer title="All Lusi’s | Lumenswap">
        <div className={styles['loading-container']}>
          <Loading size={48} />
        </div>
      </NFTListContainer>
    );
  }

  if (select.value === '1') {
    filteredCollectionNfts = filteredCollectionNfts
      .sort((a, b) => new BN(a.price).comparedTo(b.price));
  }
  if (select.value === '2') {
    filteredCollectionNfts = filteredCollectionNfts
      .sort((a, b) => new BN(b.price).comparedTo(a.price));
  }
  if (select.value === '3') {
    filteredCollectionNfts = filteredCollectionNfts
      .sort((a, b) => new BN(a.number).comparedTo(b.number));
  }
  if (select.value === '4') {
    filteredCollectionNfts = filteredCollectionNfts
      .sort((a, b) => new BN(b.number).comparedTo(a.number));
  }
  if (searchQuery && searchQuery !== '') {
    filteredCollectionNfts = filteredCollectionNfts.filter((nft) => nft.number.toString()
      .search(searchQuery) !== -1);
  }

  return (
    <NFTListContainer title="Collection nfts| Lumenswap">
      <ServerSideLoading>
        <div className={classNames('layout main', styles.main)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <CollectionDataCard collection={collectionData} collectionStats={collectionStats} />
              <div className={styles['search-container']}>
                <Input
                  onChange={handleSearchNfts}
                  placeholder="Search by number"
                />
                <SelectOption
                  items={dropdownItems}
                  defaultValue={select}
                  setValue={setSelect}
                  className={styles.filter}
                  isSearchable={false}
                />
              </div>
              <CollectionNftsData collectionNfts={filteredCollectionNfts} />
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </NFTListContainer>
  );
};

export default NFTCollectionListPage;
