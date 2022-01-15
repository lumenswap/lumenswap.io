import React, { useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import SelectOption from 'components/SelectOption';
import NoData from 'components/NoData';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import sampleLogo from 'assets/images/btc-logo.png';

import styles from './styles.module.scss';

const dropdownItems = [
  { value: 'all', label: 'All' },
  { value: 'claim', label: 'Claim' },
  { value: 'claimed', label: 'Claimed' },
  { value: 'progress', label: 'In progress' },
];

const Activity = () => {
  const [select, setSelect] = useState(dropdownItems[0]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>My activity | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  const claim = true;

  const tableInfo = [
    {
      title: 'Governance',
      dataIndex: 'governance',
      key: '1',
      render: () => (
        <div className="d-flex align-items-center">
          <Image src={sampleLogo} width={24} height={24} />
          <div className="ml-1">RBT</div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '2',
      render: () => (<>1 day ago</>),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: () => (<>100 RBT</>),
    },
    {
      title: 'Info',
      dataIndex: 'info',
      key: '3',
      render: () => (<>Create Dao</>),
    },
    {
      dataIndex: 'action',
      key: '4',
      render: () => (
        <>
          {claim
            ? <div className="color-primary cursor-pointer">Claim</div>
            : <div className={styles.claimed}>claimed</div>}
        </>
      ),
    },
  ];

  const NoDataMessage = () => (<NoData message="There is no activity" />);

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

              <div className={styles.card}>
                <CTable
                  className={styles.table}
                  columns={tableInfo}
                  dataSource={Array(20).fill({})}
                  noDataComponent={NoDataMessage}
                  rowFix={{ rowNumbers: 10, rowHeight: 51, headerRowHeight: 25 }}
                />
              </div>

              <div className="d-flex mt-4">
                <CPagination
                  pages={pages}
                  currentPage={page}
                  onPageClick={(newPage) => {
                    setPage(newPage);
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </ServerSideLoading>
    </Container>
  );
};

export default Activity;
