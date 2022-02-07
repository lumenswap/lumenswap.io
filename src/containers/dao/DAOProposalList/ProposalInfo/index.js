import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'next/image';
import urlMaker from 'helpers/urlMaker';
import CCard from 'components/CCard';
import Badge from 'components/Badge';
import SuccessIcon from 'assets/images/success-tick';
import Link from 'next/link';

import minimizeAddress from 'helpers/minimizeAddress';
import moment from 'moment';
import styles from './styles.module.scss';

const ProposalItemBadge = ({ status }) => {
  if (status === 'active') {
    return <Badge variant="success" content="Active" />;
  }

  if (status === 'ended') {
    return <Badge variant="info" content="Ended" />;
  }

  return <Badge variant="danger" content="Not started" />;
};

const ProposalInfo = ({ item, pageName }) => {
  const {
    title, desc, detail, address, logo, status, endDate, id,
  } = item;

  return (
    <Link href={urlMaker.dao.singleDao.proposalInfo(pageName, id)}>
      <a className="text-decoration-none">
        <CCard>
          <div className={styles.item}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className={styles.img}>
                  <Image
                    src={logo}
                    width={24}
                    height={24}
                    alt="sample"
                  />
                </div>
                <div className={styles.text}>By {minimizeAddress(address)}</div>
              </div>
              <div>
                <ProposalItemBadge status={status} />
              </div>
            </div>
            <h4 className={styles.title}>{title}</h4>
            <p className={classNames(styles.text, 'mt-2 mb-0')}>{desc}</p>

            <div className={classNames(styles.text, styles.detail, 'mt-4')}>
              {status !== 'active' && <SuccessIcon />}
              {status === 'active' ? `End in ${Math.floor(moment.duration(endDate - new Date().getTime()).asDays())} days` : detail}
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
