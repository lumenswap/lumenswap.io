import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'next/image';
import urlMaker from 'helpers/urlMaker';
import CCard from 'components/CCard';
import SuccessIcon from 'assets/images/success-tick';
import Link from 'next/link';
import truncateText from 'helpers/truncateText';
import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import { extractLogoByToken } from 'helpers/asset';
import BN from 'helpers/BN';
import DAOPRoposalStatusBadge from '../../DAOProposalStatusBadge';
import styles from './styles.module.scss';

const ProposalInfo = ({ item, pageName }) => {
  const {
    title, description, proposer, status, endTime, id, Governance, startTime,
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
                  <Image
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
              {
                status.toLowerCase() === 'active' && `End in ${Math.floor(moment.duration(new Date(endTime) - new Date().getTime()).asDays())} days`
              }
              {
                status === 'not started' && `Starts in ${Math.floor(moment.duration(new Date(startTime) - new Date().getTime()).asDays())} days`
              }
              {
                status === 'ended' && `${findOptionWithMostVotes()}`
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
