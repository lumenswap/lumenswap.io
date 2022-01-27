import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import SelectOption from 'components/SelectOption';
import NoData from 'components/NoData';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';

import { getMyActivity } from 'api/mockAPI/daoMyActivity';
import { useSelector } from 'react-redux';
import { extractLogoByToken } from 'helpers/asset';
import moment from 'moment';
import humanAmount from 'helpers/humanAmount';
import useIsLogged from 'hooks/useIsLogged';
import { useRouter } from 'next/router';
import urlMaker from 'helpers/urlMaker';
import styles from './styles.module.scss';

const dropdownItems = [
  { value: 'all', label: 'All' },
  { value: 'not-claimed', label: 'Claim' },
  { value: 'claimed', label: 'Claimed' },
  { value: 'in-progress', label: 'In progress' },
];

const Activity = () => {
  const [select, setSelect] = useState(dropdownItems[0]);
  const [userActivities, setUserActivities] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const isLogged = useIsLogged();
  const router = useRouter();

  const userAddress = useSelector((state) => state.user.detail.address);

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>My activity | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  function renderTableAction(data) {
    const handleClaim = () => {
      console.log('claimed !');
    };
    if (data.type === 'claimed') {
      return <div className={styles.claimed}>claimed</div>;
    }
    if (data.type === 'not-claimed') {
      return <div onClick={handleClaim} className="color-primary cursor-pointer">Claim</div>;
    }
    if (data.type === 'in-progress') {
      return <>In progress</>;
    }
    return null;
  }

  useEffect(() => {
    setUserActivities(null);
    getMyActivity(userAddress, {
      page,
      type: select.value,
    }).then((data) => {
      setUserActivities(data.data);
      setPages(data.totalPages);
      if (data.totalPages < page) {
        setPage(1);
      }
    });
  }, [select, page]);

  useEffect(() => {
    if (!isLogged) {
      router.push(urlMaker.dao.root());
    }
  }, [isLogged]);

  const tableInfo = [
    {
      title: 'Governance',
      dataIndex: 'governance',
      key: '1',
      render: (data) => (
        <div className="d-flex align-items-center">
          <Image src={extractLogoByToken(data.asset)} width={24} height={24} />
          <div className="ml-1">{data.asset.code}</div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '2',
      render: (data) => (<>{moment(data.date).fromNow()}</>),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: (data) => (<>{humanAmount(data.amount)} {data.asset.code}</>),
    },
    {
      title: 'Info',
      dataIndex: 'info',
      key: '3',
      render: (data) => (<>{data.info}</>),
    },
    {
      title: '',
      dataIndex: 'action',
      key: '4',
      render: (data) => (
        renderTableAction(data)
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
                  dataSource={userActivities}
                  loading={!userActivities}
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
