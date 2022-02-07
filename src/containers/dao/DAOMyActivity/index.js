import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
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

const activityTableHeaders = [
  {
    title: 'Governance',
    dataIndex: 'governance',
    key: '1',
    render: (activity) => (
      <div className="d-flex align-items-center">
        <Image src={extractLogoByToken(activity.asset)} width={24} height={24} />
        <div className="ml-1">{activity.asset.code}</div>
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: '2',
    render: (activity) => `${moment(activity.date).fromNow()}`,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: '3',
    render: (activity) => `${humanAmount(activity.amount)} ${activity.asset.code}`,
  },
  {
    title: 'Info',
    dataIndex: 'info',
    key: '3',
    render: (activity) => `${activity.info}`,
  },
  {
    title: '',
    dataIndex: 'action',
    key: '4',
    render: (activity) => (
      <ActivityTableAction activityInfo={activity} />
    ),
  },
];

function ActivityTableAction({ activityInfo }) {
  const handleClaim = () => {
    // do something
  };
  if (activityInfo.type === 'claimed') {
    return <div className={styles.claimed}>claimed</div>;
  }
  if (activityInfo.type === 'not-claimed') {
    return <div onClick={handleClaim} className="color-primary cursor-pointer">Claim</div>;
  }
  if (activityInfo.type === 'in-progress') {
    return 'In progress';
  }
  return null;
}

const DAOMyActivity = () => {
  const [select, setSelect] = useState(dropdownItems[0]);
  const [userActivities, setUserActivities] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useRequiredLogin(urlMaker.dao.root());

  const userAddress = useSelector((state) => state.user.detail.address);

  useEffect(() => {
    setUserActivities(null);
    getMyActivity(userAddress, {
      page,
      type: select.value,
    }).then((activities) => {
      setUserActivities(activities.data);
      setPages(activities.totalPages);
      if (activities.totalPages < page) {
        setPage(1);
      }
    });
  }, [select, page]);

  return (
    <DAOContainer title="My activity | Lumenswap">
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
                columns={activityTableHeaders}
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
    </DAOContainer>
  );
};

export default DAOMyActivity;
