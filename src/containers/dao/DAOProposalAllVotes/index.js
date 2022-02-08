import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import CTable from 'components/CTable';
import CPagination from 'components/CPagination';
import humanAmount from 'helpers/humanAmount';
import { getProposalVotes } from 'api/mockAPI/proposalInfo';
import DAOContainer from '../DAOContainer';
import styles from './styles.module.scss';

const votesTableHeaders = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: '1',
    render: (voteDetails) => (
      <a
        href={generateAddressURL(voteDetails.address)}
        className={styles.url}
        target="_blank"
        rel="noreferrer"
      >{minimizeAddress(voteDetails.address)}
      </a>
    ),
  },
  {
    title: 'Vote',
    dataIndex: 'vote',
    key: '2',
    render: (voteDetails) => `${voteDetails.vote}`,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: '3',
    render: (voteDetails) => `${humanAmount(voteDetails.amount)} ${voteDetails.asset.code}`,
  },
];

const DAOProposalAllVotes = ({ governanceAssetInfo }) => {
  const router = useRouter();
  const [votes, setVotes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: governanceAssetInfo.name },
    { url: `${urlMaker.dao.singleDao.proposalInfo(router.query.name, router.query.id)}`, name: 'Proposal info' },
    { name: 'All votes' },
  ];

  useEffect(() => {
    getProposalVotes(router.query.id,
      { page: currentPage, assetName: governanceAssetInfo.officialName })
      .then((res) => {
        setVotes(res.votes);
        setPages(res.totalPages);
      });
  }, [currentPage]);

  return (
    <DAOContainer title="All Votes | Lumenswap" info={governanceAssetInfo}>
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
                columns={votesTableHeaders}
                dataSource={votes}
                noDataMessage="There is no votes"
                loading={!votes}
                rowFix={{ rowNumbers: 20, rowHeight: 53, headerRowHeight: 25 }}
              />
            </div>

            <div className="d-flex mt-4">
              <CPagination
                pages={pages}
                currentPage={currentPage}
                onPageClick={(newPage) => {
                  setCurrentPage(newPage);
                  setVotes(null);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DAOContainer>
  );
};

export default DAOProposalAllVotes;
