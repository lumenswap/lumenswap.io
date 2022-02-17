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
import CSeeAllContentsButton from 'components/CSeeAllContentsButton';
import { openModalAction } from 'actions/modal';
import useIsLogged from 'hooks/useIsLogged';
import minimizeAddress from 'helpers/minimizeAddress';
import { generateAddressURL, ipfsHashGenerator } from 'helpers/explorerURLGenerator';
import moment from 'moment';
import humanAmount from 'helpers/humanAmount';
import { extractLogoByToken, getAssetDetails } from 'helpers/asset';
import { useEffect, useState } from 'react';
import { getVotesForProposal } from 'api/daoAPI';
import BN from 'helpers/BN';
import DAOContainer from '../DAOContainer';
import DAOSingleProposalVotes from './DAOSingleProposalVotes';
import VoteModal from './VoteModal';
import styles from './styles.module.scss';

const DAOSingleProposal = ({ proposalInfo }) => {
  const [votes, setVotes] = useState(null);
  const [status, setStatus] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLogged = useIsLogged();

  const asset = getAssetDetails({
    code: proposalInfo.Governance.assetCode,
    issuer: proposalInfo.Governance.assetIssuer,
  });

  const crumbData = [
    { url: urlMaker.dao.root(), name: 'Board' },
    { url: `${urlMaker.dao.singleDao.root(proposalInfo.Governance.name.toLowerCase())}`, name: proposalInfo.Governance.name },
    { name: 'Proposal info' },
  ];

  const handleOpenVoteModal = () => {
    dispatch(openModalAction({
      modalProps: {
        title: 'Vote',
        mainClassName: 'modal-br8',
      },
      content: <VoteModal proposalInfo={{
        endTime: proposalInfo.endTime,
        id: proposalInfo.id,
        votes: proposalInfo.options,
        asset,
        title: proposalInfo.title,
      }}
      />,
    }));
  };

  useEffect(() => {
    getVotesForProposal(router.query.id, { page: 1, limit: 10 }).then((fetchedVotes) => (
      setVotes(fetchedVotes.data)
    ));
  }, []);

  useEffect(() => {
    if (moment(proposalInfo.endTime).isAfter(moment())
     && moment(proposalInfo.startTime).isBefore(moment())) {
      setStatus('active');
    } else {
      setStatus('inactive');
    }
  }, []);

  const proposalSummary = [
    {
      title: 'Proposal ID',
      externalLink: {
        title: minimizeAddress(proposalInfo.id, 8),
        url: ipfsHashGenerator(proposalInfo.id),
      },
    },
    {
      title: 'Duration',
      render: (proposalDetails) => `${Math.floor(moment.duration(new Date(proposalDetails.endTime) - new Date(proposalDetails.startTime)).asDays())} days`,
    },
    {
      title: 'Start time',
      render: (proposalDetails) => `${moment(proposalDetails.startTime).utc().format('MMM-DD-YYYY hh:mm A +UTC')}`,
    },
    {
      title: 'End time',
      render: (proposalDetails) => `${moment(proposalDetails.endTime).utc().format('MMM-DD-YYYY hh:mm A +UTC')}`,
    },
    {
      title: 'Total voter',
      render: (proposalDetails) => `${humanAmount(proposalDetails.totalVoters)}`,
    },
    {
      title: 'Total votes',
      render: (proposalDetails) => `${humanAmount(new BN(proposalDetails.totalVotes).div(10 ** 7).toFixed(7))} ${asset.code}`,
    },
    {
      title: 'Proposer',
      externalLink: {
        title: minimizeAddress(proposalInfo.proposer),
        url: generateAddressURL(proposalInfo.proposer),
      },
    },
    {
      title: 'Governance',
      render: (proposalDetails) => (
        <div className="d-flex align-items-center">
          <Image src={extractLogoByToken(asset)} height={24} width={24} />
          <div className="ml-1">{proposalDetails.Governance.name}</div>
        </div>
      ),
    },
  ];

  return (
    <DAOContainer title="Proposal Info | Lumenswap" info={proposalInfo.Governance}>
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
              {proposalInfo.options.map((option, index) => (
                <div key={index} className="mt-4">
                  <Progressbar
                    label={option.value}
                    value={option.amount && proposalInfo.totalVotes
                      ? new BN(option.amount).div(proposalInfo.totalVotes).times(100).toFixed(1)
                      : 0}
                  />
                </div>
              ))}

              {isLogged && status === 'active' && (
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
                {proposalInfo.description}
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
              <DAOSingleProposalVotes asset={asset} votes={votes} />
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

export default DAOSingleProposal;
