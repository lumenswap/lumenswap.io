import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import CTable from 'components/CTable';
import NoData from 'components/NoData';
import CPagination from 'components/CPagination';

import styles from './styles.module.scss';

const Votes = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>All Votes | Lumenswap</title>
      </Head>
      <DAOHeader />
      {children}
    </div>
  );

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: router.query.name },
    { url: `${urlMaker.dao.singleDao.proposalInfo(router.query.name)}`, name: 'Proposal info' },
    { name: 'All votes' },
  ];

  const tableInfo = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: '1',
      render: () => (
        <a
          className="text-decoration-none"
          target="_blank"
          rel="noreferrer"
        >3P2p…rb4P
        </a>
      ),
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      key: '2',
      render: () => (<>Yes</>),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: () => (<>100 RBT</>),
    },
  ];

  const NoDataMessage = () => (<NoData message="There is no votes" />);

  return (
    <Container>
      <ServerSideLoading>
        <div className={classNames('layout main', styles.layout)}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
              <Breadcrumb
                spaceBetween={8}
                data={crumbData}
              />

              <div className={styles.card}>
                <h4 className={styles.title}>Votes
                </h4>
                <CTable
                  className={styles.table}
                  columns={tableInfo}
                  dataSource={Array(20).fill({})}
                  noDataComponent={NoDataMessage}
                  rowFix={{ rowNumbers: 20, rowHeight: 53, headerRowHeight: 25 }}
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

export default Votes;
