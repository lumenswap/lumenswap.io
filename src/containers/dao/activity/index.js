import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import ServerSideLoading from 'components/ServerSideLoading';
import SelectOption from 'components/SelectOption';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import useRequiredLogin from 'hooks/useRequiredLogin';
import { getMyActivity } from 'api/mockAPI/daoMyActivity';
import { useSelector } from 'react-redux';
import { extractLogoByToken } from 'helpers/asset';
import moment from 'moment';
import humanAmount from 'helpers/humanAmount';
import urlMaker from 'helpers/urlMaker';
import DAOContainer from '../DAOContainer';
import styles from './styles.module.scss';

const dropdownItems = [
  { value: 'all', label: 'All' },
  { value: 'not-claimed', label: 'Claim' },
  { value: 'claimed', label: 'Claimed' },
  { value: 'in-progress', label: 'In progress' },
];

function ActivityTableAction({ data }) {
  const handleClaim = () => {
    // do something
  };
  if (data.type === 'claimed') {
    return <div className={styles.claimed}>claimed</div>;
  }
  if (data.type === 'not-claimed') {
    return <div onClick={handleClaim} className="color-primary cursor-pointer">Claim</div>;
  }
  if (data.type === 'in-progress') {
    return 'In progress';
  }
  return null;
}

const Activity = () => {
  const [select, setSelect] = useState(dropdownItems[0]);
  const [userActivities, setUserActivities] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const loginRequired = useRequiredLogin(urlMaker.dao.root());

  const userAddress = useSelector((state) => state.user.detail.address);

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
      render: (data) => `${moment(data.date).fromNow()}`,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: (data) => `${humanAmount(data.amount)} ${data.asset.code}`,
    },
    {
      title: 'Info',
      dataIndex: 'info',
      key: '3',
      render: (data) => `${data.info}`,
    },
    {
      title: '',
      dataIndex: 'action',
      key: '4',
      render: (data) => (
        <ActivityTableAction data={data} />
      ),
    },
  ];

  return (
    <DAOContainer title="My activity | Lumenswap">
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
                  noDataMessage="There is no activity"
                  rowFix={{ rowNumbers: 10, rowHeight: 51, headerRowHeight: 43 }}
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
    </DAOContainer>
  );
};

export default Activity;
