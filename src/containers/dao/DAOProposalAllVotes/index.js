import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { generateAddressURL } from 'helpers/explorerURLGenerator';
import minimizeAddress from 'helpers/minimizeAddress';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import CTable from 'components/CTable';
import CPagination from 'components/CPagination';
import humanizeAmount from 'helpers/humanizeAmount';
import { getVotesForProposal } from 'api/daoAPI';
import BN from 'helpers/BN';
import DAOContainer from '../DAOContainer';
import styles from './styles.module.scss';

const votesTableHeaders = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: '1',
    render: (voteDetails) => (
      <a
        href={generateAddressURL(voteDetails.voter)}
        className={styles.url}
        target="_blank"
        rel="noreferrer"
      >{minimizeAddress(voteDetails.voter)}
      </a>
    ),
  },
  {
    title: 'Vote',
    dataIndex: 'vote',
    key: '2',
    render: (voteDetails) => `${voteDetails.voteText}`,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: '3',
    render: (voteDetails) => `${humanizeAmount(new BN(voteDetails.amount).div(10 ** 7).toFixed(7))} ${voteDetails.Proposal.Governance.assetCode}`,
  },
];

const DAOProposalAllVotes = ({ proposalInfo }) => {
  const router = useRouter();
  const [votes, setVotes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(router.query.name)}`, name: proposalInfo.governanceName },
    { url: `${urlMaker.dao.singleDao.proposalInfo(router.query.name, router.query.id)}`, name: 'Proposal info' },
    { name: 'All votes' },
  ];

  useEffect(() => {
    getVotesForProposal(router.query.id,
      { page: currentPage, limit: 20 })
      .then((res) => {
        setVotes(res.data);
        setPages(res.totalPages);
      });
  }, [currentPage]);

  return (
    <DAOContainer
      title={`
    ${proposalInfo.governanceName} DAO | All votes | Lumenswap
    `}
      info={proposalInfo.assetInfo}
    >
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
