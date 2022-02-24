import React, { useState } from 'react';
import BridgeContainer from 'containers/bridge/BridgeContainer';
import classNames from 'classnames';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import ArrowRight from 'assets/images/arrowRight';
import urlMaker from 'helpers/urlMaker';

import styles from './styles.module.scss';
import StatusLabel from './StatusLabel';

const BridgeActivity = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);

  const sampleStatus = 'pending';

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
      render: () => <StatusLabel status={sampleStatus} />,
    },
  ];
  const sampleData = Array(9).fill({ id: 'L123456' });
  const rowURLGenerator = (data) => urlMaker.bridge.activity.detail(data.id);

  return (
    <BridgeContainer title="Bridge Activity | Lumenswap">
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1 className={styles.title}>My activities</h1>

            <div className={styles.card}>
              <CTable
                className={styles.table}
                columns={columns}
                dataSource={sampleData}
                noDataMessage="There is no activity"
                rowFix={{ rowNumbers: 10, rowHeight: 53, headerRowHeight: 30 }}
                rowLink={rowURLGenerator}
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
