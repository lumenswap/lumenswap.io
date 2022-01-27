import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import ServerSideLoading from 'components/ServerSideLoading';
import DAOHeader from 'containers/dao/DAOHeader';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import CTable from 'components/CTable';
import NoData from 'components/NoData';
import CPagination from 'components/CPagination';
import humanAmount from 'helpers/humanAmount';
import { getProposalVotes } from 'api/mockAPI/proposalInfo';
import styles from './styles.module.scss';

const Votes = ({ info }) => {
  const router = useRouter();
  const [votes, setVotes] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const Container = ({ children }) => (
    <div className="container-fluid">
      <Head>
        <title>All Votes | Lumenswap</title>
      </Head>
      <DAOHeader asset={info.asset} />
      {children}
    </div>
  );

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: info.name },
    { url: `${urlMaker.dao.singleDao.proposalInfo(router.query.name, router.query.id)}`, name: 'Proposal info' },
    { name: 'All votes' },
  ];

  const tableInfo = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: '1',
      render: (data) => (
        <a
          href={generateAddressURL(data.address)}
          className={styles.url}
          target="_blank"
          rel="noreferrer"
        >{minimizeAddress(data.address)}
        </a>
      ),
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      key: '2',
      render: (data) => (<>{data.vote}</>),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      render: (data) => (<>{humanAmount(data.amount)} {data.asset.code}</>),
    },
  ];

  useEffect(() => {
    setVotes(null);
    getProposalVotes(router.query.id, {
      page,
    }).then((data) => {
      setVotes(data.votes);
      setPages(data.totalPages);
    });
  }, [page]);

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
                  dataSource={votes}
                  noDataComponent={NoDataMessage}
                  loading={!votes}
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
