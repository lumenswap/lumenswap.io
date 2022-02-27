import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import useRequiredLogin from 'hooks/useRequiredLogin';
import { useDispatch, useSelector } from 'react-redux';
import { extractLogoByToken, getAssetDetails } from 'helpers/asset';
import moment from 'moment';
import humanizeAmount from 'helpers/humanizeAmount';
import urlMaker from 'helpers/urlMaker';
import generateClaimClaimableBalanceTRX from 'stellar-trx/generateClaimClaimableBalanceTRX';
import { getAddressActivity } from 'api/daoAPI';
import { fetchClaimableBalances } from 'api/stellar';
import showGenerateTrx from 'helpers/showGenerateTrx';
import showSignResponse from 'helpers/showSignResponse';
import BN from 'helpers/BN';
import DAOContainer from '../DAOContainer';
import styles from './styles.module.scss';
import { TIME_AFTER_PROPOSAL_END_TIME } from '../consts';

const ACTIVITY_TEXTS = {
  CREATE_PROPOSAL: 'Create Proposal',
  CAST_VOTE: 'Vote',
};

const ACTIVITY_TYPES = {
  CREATE_PROPOSAL: 'CREATE_PROPOSAL',
  CAST_VOTE: 'CAST_VOTE',
};

function calcualateActivityAmount(activity) {
  if (activity.Proposal) {
    return `${humanizeAmount(new BN(activity.Proposal.Governance.minimumCreateProposalAmount).toFixed(7))} ${activity.Proposal.Governance.assetCode}`;
  }

  return `${humanizeAmount(new BN(activity.Vote.amount).div(10 ** 7).toFixed(7))} ${activity.Vote.Proposal.Governance.assetCode}`;
}

const activityTableHeaders = [
  {
    title: 'Governance',
    dataIndex: 'governance',
    key: '1',
    render: (activity) => {
      let logo = '';
      let governanceName = '';

      if (activity.Proposal) {
        logo = extractLogoByToken(
          getAssetDetails({
            code: activity.Proposal.Governance.assetCode,
            issuer: activity.Proposal.Governance.assetIssuer,
          }),
        );
        governanceName = activity.Proposal.Governance.name;
      } else if (activity.Vote) {
        logo = extractLogoByToken(
          getAssetDetails({
            code: activity.Vote.Proposal.Governance.assetCode,
            issuer: activity.Vote.Proposal.Governance.assetIssuer,
          }),
        );
        governanceName = activity.Vote.Proposal.Governance.name;
      }

      return (
        <div className="d-flex align-items-center">
          <Image
            src={logo}
            width={24}
            height={24}
          />
          <div className="ml-1">{governanceName}</div>
        </div>
      );
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: '2',
    render: (activity) => `${moment(activity.createdAt).fromNow()}`,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: '3',
    render: (activity) => calcualateActivityAmount(activity),
  },
  {
    title: 'Info',
    dataIndex: 'info',
    key: '4',
    render: (activity) => ACTIVITY_TEXTS[activity.activityType],
  },
  {
    title: '',
    dataIndex: 'action',
    key: '5',
    render: (activity) => (
      <ActivityTableAction activityInfo={activity} />
    ),
  },
];

function ActivityTableAction({ activityInfo }) {
  const dispatch = useDispatch();
  const handleClaim = async () => {
    if (activityInfo.activityType === ACTIVITY_TYPES.CREATE_PROPOSAL) {
      // eslint-disable-next-line no-inner-declarations
      function func() {
        return generateClaimClaimableBalanceTRX(
          activityInfo.userAddress,
          activityInfo.Proposal.claimableBalanceId,
        );
      }

      const trx = await showGenerateTrx(func, dispatch);
      await showSignResponse(trx, dispatch);
    } else {
      // eslint-disable-next-line no-inner-declarations
      function func() {
        return generateClaimClaimableBalanceTRX(
          activityInfo.userAddress,
          activityInfo.Vote.claimableBalanceId,
        );
      }

      const trx = await showGenerateTrx(func, dispatch);
      await showSignResponse(trx, dispatch);
    }
  };
  if (activityInfo.type === 'claimed') {
    return <div className={styles.claimed}>Claimed</div>;
  }
  if (activityInfo.type === 'not-claimed') {
    return <div onClick={handleClaim} className="color-primary cursor-pointer">Claim</div>;
  }
  if (activityInfo.type === 'in-progress') {
    return 'In Progress';
  }
  return null;
}

const DAOMyActivity = () => {
  const [userActivities, setUserActivities] = useState(null);
  const [userClaimableBalances, setUserClaimableBalances] = useState(null);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useRequiredLogin(urlMaker.dao.root());

  const userAddress = useSelector((state) => state.user.detail.address);

  useEffect(() => {
    if (userAddress) {
      fetchClaimableBalances({ claimant: userAddress, limit: 200 }).then((balances) => {
        setUserClaimableBalances(balances._embedded.records);
      });
    }
  }, [userAddress]);

  useEffect(() => {
    setUserActivities(null);
    getAddressActivity(userAddress, {
      page,
    }).then((activities) => {
      setUserActivities(activities.data);
      setPages(activities.totalPages);
      if (activities.totalPages < page) {
        setPage(1);
      }
    });
  }, [page]);

  const enrichedDataSource = [];
  if (userActivities && userClaimableBalances) {
    for (const activity of userActivities) {
      let claimType = 'not-claimed';
      if (activity.activityType === ACTIVITY_TYPES.CREATE_PROPOSAL) {
        const balanceExists = userClaimableBalances
          .find((balance) => balance.id === activity.Proposal.claimableBalanceId);

        if (balanceExists) {
          if (
            new Date(activity.Proposal.endTime).getTime()
             + TIME_AFTER_PROPOSAL_END_TIME < new Date()
              .getTime()
          ) {
            claimType = 'not-claimed';
          } else {
            claimType = 'in-progress';
          }
        } else {
          claimType = 'claimed';
        }
      }

      if (activity.activityType === ACTIVITY_TYPES.CAST_VOTE) {
        const balanceExists = userClaimableBalances
          .find((balance) => balance.id === activity.Vote.claimableBalanceId);

        if (balanceExists) {
          if (
            new Date(activity.Vote.Proposal.endTime).getTime() + TIME_AFTER_PROPOSAL_END_TIME
            < new Date().getTime()
          ) {
            claimType = 'not-claimed';
          } else {
            claimType = 'in-progress';
          }
        } else {
          claimType = 'claimed';
        }
      }

      enrichedDataSource.push({
        ...activity,
        type: claimType,
        key: activity.id,
      });
    }
  }

  return (
    <DAOContainer title="My DAO activities | Lumenswap">
      <div className={classNames('layout main', styles.layout)}>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11 col-sm-12 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={styles.title}>My activity</h1>
            </div>

            <div className={styles.card}>
              <CTable
                className={styles.table}
                columns={activityTableHeaders}
                dataSource={enrichedDataSource}
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
