import React, { useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import SelectOption from 'components/SelectOption';

import styles from './styles.module.scss';

const dropdownItems = [
  { value: 'all', label: 'All' },
  { value: 'claim', label: 'Claim' },
  { value: 'claimed', label: 'Claimed' },
  { value: 'progress', label: 'In progress' },
];

const Activity = () => {
  const [select, setSelect] = useState(dropdownItems[0]);
  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>My activity | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  return (
    <Container>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className={styles.title}>My activity</h1>
                <div>
                  <SelectOption
                    items={dropdownItems}
                    defaultValue={select}
                    setValue={setSelect}
                    className={styles.filter}
                    isSearchable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default Activity;
