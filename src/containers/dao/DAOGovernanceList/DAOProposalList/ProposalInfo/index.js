import PropTypes from 'prop-types';
import classNames from 'classnames';
import urlMaker from 'helpers/urlMaker';
import CCard from 'components/CCard';
import SuccessIcon from 'assets/images/success-tick';
import Link from 'next/link';
import truncateText from 'helpers/truncateText';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import { extractLogoByToken } from 'helpers/asset';
import BN from 'helpers/BN';
import DAOPRoposalStatusBadge from '../../../DAOProposalStatusBadge';
import styles from './styles.module.scss';

function generateDurationTimeText(item) {
  let duration;
  let finalTime;
  if (item.status.toLowerCase() === 'active') {
    duration = moment.duration(new Date(item.endTime) - new Date().getTime());
    finalTime = duration.days() < 1 ? `${duration.hours()} hours` : `${duration.days()} days`;
    return `End in ${finalTime}`;
  }
  if (item.status.toLowerCase() === 'not started') {
    duration = moment.duration(new Date(item.startTime) - new Date().getTime());
    finalTime = duration.days() < 1 ? `${duration.hours()} hours` : `${duration.days()} days`;
    return `Starts in ${finalTime}`;
  }
  if (item.status.toLowerCase() === 'ended') {
    return null;
  }
  throw new Error(`${item.status.toLowerCase()} is not defind`);
}

const ProposalInfo = ({ item, pageName }) => {
  const {
    title, description, proposer, status, id, Governance,
  } = item;

  function findOptionWithMostVotes() {
    let mostAmount = 0;
    let mostAmountIndex = 0;
    item.options?.forEach((option, index) => {
      if (new BN(option.amount).isGreaterThan(mostAmount)) {
        mostAmount = option.amount;
        mostAmountIndex = index;
      }
    });

    return item.options[mostAmountIndex]?.value;
  }

  return (
    <Link href={urlMaker.dao.singleDao.proposalInfo(pageName, id)}>
      <a className="text-decoration-none">
        <CCard>
          <div className={styles.item}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className={styles.img}>
                  <img
                    src={
                      extractLogoByToken(
                        { code: Governance.assetCode, issuer: Governance.assetIssuer },
                      )
                    }
                    width={24}
                    height={24}
                    alt="sample"
                  />
                </div>
                <div className={styles.text}>By {minimizeAddress(proposer)}</div>
              </div>
              <div>
                <DAOPRoposalStatusBadge status={status} />
              </div>
            </div>
            <h4 className={styles.title}>{title}</h4>
            <p className={classNames(styles.text, 'mt-2 mb-0')}>
              {truncateText(description, 162)}
            </p>

            <div className={classNames(styles.text, styles.detail, 'mt-4')}>
              {status.toLowerCase() === 'ended' && <SuccessIcon />}
              {generateDurationTimeText(item)}
              {
                status.toLowerCase() === 'ended' && `${findOptionWithMostVotes()}`
              }
            </div>
          </div>
        </CCard>
      </a>
    </Link>
  );
};

ProposalInfo.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProposalInfo;
