import classNames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Breadcrumb from 'components/BreadCrumb';
import urlMaker from 'helpers/urlMaker';
import Progressbar from 'components/Progressbar';
import Button from 'components/Button';
import ArrowIcon from 'assets/images/angleRight';
import InfoBox from 'components/InfoBox';
import { useState, useEffect } from 'react';
import CSeeAllContentsButton from 'components/CSeeAllContentsButton';
import { openModalAction } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateAddressURL, generateTransactionURL } from 'helpers/explorerURLGenerator';
import moment from 'moment';
import humanAmount from 'helpers/humanAmount';
import { extractLogoByToken } from 'helpers/asset';
import { getProposalVotes } from 'api/mockAPI/proposalInfo';
import DAOContainer from '../DAOContainer';
import VotesData from './VotesData';
import Vote from './Vote';
import styles from './styles.module.scss';

const ProposalInfo = ({ proposalInfo }) => {
  const [votes, setVotes] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLogged = useIsLogged();

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(proposalInfo.officialName)}`, name: proposalInfo.governance },
    { name: 'Proposal info' },
  ];

  const handleOpenVoteModal = () => {
    dispatch(openModalAction({
      modalProps: {
        title: 'Vote',
        mainClassName: 'modal-br8',
      },
      content: <Vote proposalInfo={{
        votes: proposalInfo.votes,
        asset: proposalInfo.asset,
        title: proposalInfo.title,
      }}
      />,
    }));
  };

  useEffect(() => {
    getProposalVotes(router.query.id, {
      assetName: proposalInfo.officialName,
    }).then((voters) => (
      setVotes(voters)
    ));
  }, []);

  const proposalSummary = [
    {
      title: 'Proposal ID',
      externalLink: {
        title: minimizeAddress(proposalInfo.proposalID, 8),
        url: generateTransactionURL(proposalInfo.proposalID),
      },
    },
    {
      title: 'Duration',
      render: (proposalDetails) => `${Math.floor(moment.duration(proposalDetails.endDate - proposalDetails.startDate).asDays())} days`,
    },
    {
      title: 'Start time',
      render: (proposalDetails) => `${moment(proposalDetails.startDate).utc().format('MMM-DD-YYYY hh:mm A +UTC')}`,
    },
    {
      title: 'End time',
      render: (proposalDetails) => `${moment(proposalDetails.endDate).utc().format('MMM-DD-YYYY hh:mm A +UTC')}`,
    },
    {
      title: 'Total voter',
      render: (proposalDetails) => `${humanAmount(proposalDetails.totalVoters)}`,
    },
    {
      title: 'Total votes',
      render: (proposalDetails) => `${humanAmount(proposalDetails.totalVotes)} ${proposalDetails.asset.code}`,
    },
    {
      title: 'Proposer',
      externalLink: {
        title: minimizeAddress(proposalInfo.proposerAddress),
        url: generateAddressURL(proposalInfo.proposerAddress),
      },
    },
    {
      title: 'Governance',
      render: (proposalDetails) => (
        <div className="d-flex align-items-center">
          <Image src={extractLogoByToken(proposalDetails.asset)} height={24} width={24} />
          <div className="ml-1">{proposalDetails.governance}</div>
        </div>
      ),
    },
  ];

  return (
    <DAOContainer title="Proposal Info | Lumenswap" info={proposalInfo}>
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <Breadcrumb
              spaceBetween={8}
              data={crumbData}
            />

            <div className={classNames(styles.card, 'mt-4')}>
              <h3 className={styles['card-title']}>
                {proposalInfo.title}
              </h3>
              {proposalInfo.votes.map((vote, index) => (
                <div key={index} className="mt-4">
                  <Progressbar label={vote.title} value={vote.percentage} />
                </div>
              ))}

              {isLogged && (
                <Button
                  variant="primary"
                  className={styles.btn}
                  onClick={handleOpenVoteModal}
                >
                  Vote <ArrowIcon />
                </Button>
              )}
            </div>

            <div className={classNames(styles.card, 'mt-4')}>
              <h4 className={styles['card-title-small']}>Description</h4>
              <p className={styles['card-desc']}>
                {proposalInfo.desc}
              </p>
            </div>

            <div className="mt-4">
              <InfoBox
                rows={proposalSummary}
                data={proposalInfo}
                className={styles['row-box']}
                sidePadding={24}
                bordered
              />
            </div>

            <div className={classNames(styles.card, 'mt-4 p-0')}>
              <h4 className={classNames(
                styles['card-title-small'],
                styles['card-title-table'],
              )}
              >Votes
              </h4>
              <VotesData votes={votes} />
            </div>

            <div className="mt-3">
              <CSeeAllContentsButton
                link={`${urlMaker.dao.singleDao.allVotes(router.query.name, router.query.id)}`}
                content="See all Votes"
              />
            </div>

          </div>
        </div>
      </div>
    </DAOContainer>
  );
};

export default ProposalInfo;
