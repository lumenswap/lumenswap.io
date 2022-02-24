import React, { useState } from 'react';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import classNames from 'classnames';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import ArrowRight from 'assets/images/arrowRight';
import EmptyCheckCircle from 'assets/images/emptyCheckCircle';
import Clock from 'assets/images/clock';

import styles from './styles.module.scss';

const BridgeActivity = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);

  const sampleStatus = 'pending';

  const renderStatusLabel = (status) => {
    if (status === 'success') {
      return (
        <div className={classNames('d-flex align-items-center',
          styles['status-success'])}
        >
          <EmptyCheckCircle />
          <div className="ml-1">Success</div>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={classNames('d-flex align-items-center',
          styles['status-pending'])}
        >
          <Clock />
          <div className="mx-1">Pending</div>
          <ArrowRight />
        </div>
      );
    }

    return (
      <div className={styles['status-expired']}>
        Expired
      </div>
    );
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: '1',
      render: () => 'L123456',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '2',
      render: () => '1 min ago',
    },
    {
      title: 'Amount',
      dataIndex: 'date',
      key: '3',
      render: () => (
        <div className={styles['col-amount']}>
          100 LUSDT
          <ArrowRight />
          100 LUSDT
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'date',
      key: '4',
      render: () => renderStatusLabel(sampleStatus),
    },
  ];

  return (
    <BridgeContainer title="Bridge Convert | Lumenswap">
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>My activities</h1>

            <div className={styles.card}>
              <CTable
                className={styles.table}
                columns={columns}
                dataSource={Array(9).fill({})}
                noDataMessage="There is no activity"
                rowFix={{ rowNumbers: 10, rowHeight: 53, headerRowHeight: 30 }}
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
    </BridgeContainer>
  );
};

export default BridgeActivity;
