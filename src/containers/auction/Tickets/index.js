import Head from 'next/head';
import { useState } from 'react';
import classNames from 'classnames';

import AuctionHeader from 'components/AuctionHeader';
import SelectOption from 'components/SelectOption';

import styles from './styles.module.scss';

const AuctionTickets = () => {
  const dropdownItems = [
    { value: 'rbt', label: 'Rabet (RBT)' },
    { value: 'lsp', label: 'Lumenswap (LSP)' },
  ];
  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>Auction Tickets | Lumenswap</title>
      </Head>
      <AuctionHeader />
      {children}
    </div>
  );

  return (
    <Container>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>My Bids</h1>
              <SelectOption
                items={dropdownItems}
                setValue={setSelectedItem}
                className={styles.filter}
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuctionTickets;
